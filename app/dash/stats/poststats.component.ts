import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {PostlerService} from "../../services/postler.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'poststats',
  templateUrl: 'app/dash/stats/poststats.component.html'
})
export class PostStats {
  public barChartOptions: any = {
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
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      intersect: false
    }
  };

  public barChartLabels: string[] = [""];
  public barChartData: any[] = [{data: [], label: ''}];
  private chart: Chart;

  zivis: Zivi[];

  constructor(private ziviService: ZiviService, private postService: PostlerService) {
    this.loadGraphData();
    postService.onStateChange().subscribe((data: any) => {
      this.loadGraphData();
    });
  }

  loadGraphData() {
    this.ziviService.getAllZivis().subscribe(zivis => {
      zivis.sort((a: Zivi, b: Zivi) => {
        return a.post_count < b.post_count ? 1 : a.post_count > b.post_count ? -1 : 0;
      });
      console.info('Sorted graph data:', zivis);
      this.zivis = zivis;
      this.updateGraph();
    });
  }

  updateGraph() {
    this.barChartData = this.zivis.map((zivi) => {
      return {
        data: [zivi.post_count],
        label: zivi.name,
        backgroundColor: zivi.colorHex,
        fontColor: '#ffffff'
      };
    });
    this.barChartLabels = this.zivis.map((zivi) => zivi.name);
    this.chart = new Chart('poststats-canvas', {
      type: 'bar',
      data: {
        labels: [""],
        datasets: this.barChartData
      },
      options: this.barChartOptions
    })
  }
}
