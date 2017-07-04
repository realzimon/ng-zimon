import {Component} from '@angular/core';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'home-tab',
  templateUrl: 'app/settings/home-tab.component.html'
})
export class HomeTabComponent {
  chefziviConfirm: false;

  constructor(private settingsService: SettingsService) {
  }
}
