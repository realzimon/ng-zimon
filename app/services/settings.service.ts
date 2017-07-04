import {EventEmitter, Injectable} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Injectable()
export class SettingsService {
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() {

  }

  openSettingsModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeSettingsModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }
}
