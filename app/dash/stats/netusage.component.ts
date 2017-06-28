import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {NetUsageService, NetUsage} from "../../services/netusage.service";

class UsageDataSet {
  readonly data: number[];
  borderColor: string = '#ffffff';
  label: string;
  borderWidth: number;
  readonly pointRadius = 0;

  constructor(readonly mac: string) {
    this.label = mac;
    this.data = new Array(20).fill(0);
  }

  static fromUsage(usage: NetUsage): UsageDataSet {
    let result = new UsageDataSet(usage.mac);
    result.updateFromUsage(usage);
    return result;
  }

  updateFromUsage(usage: NetUsage) {
    if (!(usage.mac === this.mac)) {
      console.error('UsageDataSet', this, 'updated with different mac:', usage);
    }
    this.data.shift();
    this.data.push(Math.ceil(usage.recentDownloadRate / 1000)); //convert bit/s to kbit/s
    this.computeColorAndWidthFromUsage(usage);
    this.label = usage.hostname || usage.mac;
  }

  updateWithNoUsage() {
    this.data.shift();
    this.data.push(0);
  }

  isEmpty(): boolean {
    for (let dataPoint of this.data) {
      if (dataPoint !== 0) {
        return false;
      }
    }
    return true;
  }

  private computeColorAndWidthFromUsage(usage: NetUsage) {
    if (usage.zivi) {
      this.borderColor = usage.zivi.colorHex;
    } else {
      this.borderColor = '#ffffff';
      this.borderWidth = 1; //px
    }
  }
}

@Component({
  selector: 'netusage',
  templateUrl: 'app/dash/stats/netusage.component.html'
})
export class NetUsageComponent implements OnInit {
  private chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          fontColor: '#ffffff',
          beginAtZero: true,
          suggestedMax: 1024
        },
        gridLines: {
          color: 'rgba(255,255,255,0.4)',
          zeroLineColor: '#ffffff'
        }
      }],
      xAxes: [{
        display: true,
        ticks: {
          fontColor: '#ffffff',
          beginAtZero: true,
          suggestedMax: 20,
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    },
    elements: {
      line: {
        fill: false,
        lineTension: 0.1
      }
    }
  };
  private chartDatasets: UsageDataSet[] = [];
  private chartProperties = {
    type: 'line',
    data: {
      labels: Array(20),
      datasets: this.chartDatasets
    },
    options: this.chartOptions
  };

  public chart: Chart;

  constructor(private netUsageService: NetUsageService) {
    this.chartProperties.data.labels.fill("kbit/s");
    this.netUsageService.getNetUsageUpdates().subscribe((usages: NetUsage[]) => {
      this.updateGraphFromUsages(usages);
    });
  }

  ngOnInit() {
    this.chart = new Chart('netusage-canvas', this.chartProperties);
  }

  private updateGraphFromUsages(usages: NetUsage[]) {
    let macsToUsages = this.mapMacsToUsages(usages);
    this.chartDatasets.forEach(dataset => {
      let currentUsage: NetUsage = macsToUsages[dataset.mac];
      if (currentUsage) {
        dataset.updateFromUsage(currentUsage);
        usages.splice(usages.indexOf(currentUsage), 1);
      } else {
        dataset.updateWithNoUsage();
        if (dataset.isEmpty()) {
          this.chartDatasets.splice(this.chartDatasets.indexOf(dataset), 1);
        }
      }
    });
    usages.forEach(leftoverUsage => {
      let dataset = UsageDataSet.fromUsage(leftoverUsage);
      this.chartDatasets.push(dataset);
    });
    this.chart.update();
  }

  private mapMacsToUsages(usages: NetUsage[]) {
    let macsToUsages = {};
    usages.forEach(usage => {
      macsToUsages[usage.mac] = usage;
    });
    return macsToUsages;
  }
}
