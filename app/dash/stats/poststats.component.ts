import {Component, OnInit} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {PostlerService} from '../../services/postler.service';
import {Chart} from 'chart.js';
import { PoststatsService } from '../../services/poststats.service';

@Component({
  selector: 'poststats',
  templateUrl: 'app/dash/stats/poststats.component.html'
})
export class PostStats implements OnInit {

  constructor(private postService: PostlerService, private poststatsService: PoststatsService) {
    postService.onStateChange().subscribe(() => {
      this.poststatsService.loadGraphData();
    });
  }

  ngOnInit() {
    this.poststatsService.initGraph();
  }
}
