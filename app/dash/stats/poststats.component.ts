import {Component, OnInit} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {PostlerService} from "../../services/postler.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'poststats',
  templateUrl: 'app/dash/stats/poststats.component.html'
})
export class PostStats implements OnInit {
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          fontColor: '#ffffff'
        },
        gridLines: {
          color: 'rgba(255,255,255,0.4)',
          zeroLineColor: '#ffffff'
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    }
  };

  private chartProperties = {
    type: 'bar',
    data: {
      labels: ["Post"],
      datasets: Array()
    },
    options: this.chartOptions
  };

  private chart: Chart;
  private loadFlag = false;
  private error = false;
  zivis: Zivi[];

  constructor(private ziviService: ZiviService, private postService: PostlerService) {
    postService.onStateChange().subscribe(() => {
      this.loadGraphData();
    });
  }

  ngOnInit() {
    this.chart = new Chart('poststats-canvas', this.chartProperties);
    this.loadGraphData();
  }

  loadGraphData() {
    if (this.loadFlag) {
      return;
    } else {
      this.loadFlag = true;
    }
    this.ziviService.getAllZivis()
      .retryWhen(errors => {
        this.error = true;
        return errors.delay(30000);
      })
      .subscribe(zivis => {
        zivis.sort((a: Zivi, b: Zivi) => {
          return a.post_count < b.post_count ? 1 : a.post_count > b.post_count ? -1 : 0;
        });
        this.zivis = zivis;
        this.updateGraph();
        this.loadFlag = false;
        this.error = false;
      });
  }

  updateGraph() {
    this.chartProperties.data.datasets = this.zivis.map((zivi) => {
      return {
        data: [zivi.post_count],
        label: zivi.name,
        backgroundColor: zivi.colorHex,
        fontColor: '#ffffff'
      };
    });
    this.chart.update();
  }
}
