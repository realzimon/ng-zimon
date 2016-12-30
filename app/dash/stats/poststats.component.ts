import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {PostlerService} from "../../services/postler.service";

@Component({
  selector: 'poststats',
  templateUrl: 'app/dash/stats/poststats.component.html'
})
export class PostStats {
  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartColors: any[] = [];

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
      this.zivis = zivis;
      this.updateGraph();
    });
  }

  updateGraph() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartColors = [];
    this.pieChartColors.push({
      backgroundColor: []
    });
    this.zivis.forEach((zivi) => {
      this.pieChartData.push(zivi.post_count);
      this.pieChartLabels.push(zivi.name);
      this.pieChartColors[0].backgroundColor.push(zivi.colorHex);
    });
  }

}
