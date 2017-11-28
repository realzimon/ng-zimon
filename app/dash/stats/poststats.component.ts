import {Component, OnInit} from '@angular/core';
import {PostlerService} from '../../services/postler.service';
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
