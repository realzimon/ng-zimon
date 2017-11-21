import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../services/zivi.service';
import { ColorService } from '../services/color.service';


@Component({
  selector: 'zivis-tab',
  templateUrl: 'app/settings/zivis-tab.component.html'
})
export class ZivisTabComponent {
  private zivis: Zivi[];
  private error: any;

  constructor(private ziviService: ZiviService, private colorService: ColorService) {
    this.loadZivis();
  }

  loadZivis() {
    this.retrieveZivis();
    this.ziviService.getZiviUpdates().subscribe(action => {
      if (action === 'delete') {
        console.log(' --- Updated zivi list in settings');
        this.retrieveZivis();
      }
    });
  }

  private retrieveZivis() {
    this.ziviService.getAllZivis()
      .subscribe(zivis => {
        this.zivis = zivis;
        this.error = null;
      }, error => {
        this.zivis = [];
        this.error = error;
      });
  }

  addNewZivi() {
    let color: string;
    this.colorService.getRandomColor().subscribe(randcolor => color = randcolor);

    let zivi = new Zivi(
      '', '', 0, color, '#ffc107', '', 0, []
    );
    zivi.create = true;
    this.zivis.push(zivi);
    // Scroll to the bottom of the tab to present the new element:
    let $tab = $('.modal-content');
    $tab.animate({
      scrollTop: $tab[0].scrollHeight
    }, 1000);
  }
}
