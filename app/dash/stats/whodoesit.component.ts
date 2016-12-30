import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {TimerService} from "../../services/timer.service";

@Component({
  selector: 'whodoesitstat',
  templateUrl: 'app/dash/stats/whodoesit.component.html'
})
export class WhoDoesItStats {
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
    }
  };

  public barChartColors: any[] = [];
  public barChartLabels: string[] = [];
  public barChartData: any[] = [{data: [], label: ''}];

  zivis: Zivi[];
  loadFlag: boolean = false;

  constructor(private ziviService: ZiviService, private timerService: TimerService) {
    this.loadGraphData();
    timerService.getTimerUpdates().subscribe((data: any) => {
      if (this.loadFlag) {
        this.loadFlag = false;
        this.loadGraphData();
      }
      if (data.remaining === 0) {
        this.loadFlag = true;
      }
    });
  }

  loadGraphData() {
    this.ziviService.getAllZivis().subscribe(zivis => {
      zivis.sort((a: Zivi, b: Zivi) => {
        return a.first < b.first ? 1 : a.first > b.first ? -1 : 0;
      });
      this.zivis = zivis;
      this.updateGraph();
    });
  }

  updateGraph() {
    this.barChartData = [];
    this.barChartColors = [];
    this.zivis.forEach((zivi) => {
      this.barChartData.push({
        data: [zivi.first],
        label: zivi.name
      });
      this.barChartColors.push({
        backgroundColor: zivi.colorHex,
        fontColor: '#ffffff'
      });
    });
  }

}
