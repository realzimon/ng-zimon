import {Component} from '@angular/core';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'settings-modal',
  templateUrl: 'app/settings/settings-modal.component.html'
})
export class SettingsModalComponent {


  constructor(public settingsService: SettingsService) {

  }

}
