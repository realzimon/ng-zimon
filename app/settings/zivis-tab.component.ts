import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../services/zivi.service';

@Component({
  selector: 'zivis-tab',
  templateUrl: 'app/settings/zivis-tab.component.html'
})
export class ZivisTabComponent {
  private zivis: Zivi[];
  private error: any;

  constructor(private ziviService: ZiviService) {
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
    let zivi = new Zivi(
      '', '', 0, 'amber', '#ffc107', '', 0, []
    );
    zivi.create = true;
    this.zivis.push(zivi);
  }
}
