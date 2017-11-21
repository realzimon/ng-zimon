import {Component, OnInit} from '@angular/core';
import {Zivi, ZiviService} from '../services/zivi.service';
import {toast} from 'angular2-materialize';
import {DomSanitizer} from '@angular/platform-browser';
import { ColorService } from '../services/color.service';
import { ColorPair } from '../classes/colorPair';

@Component({
  selector: 'ziviedit',
  templateUrl: 'app/settings/zivi-settings.component.html',
  inputs: ['zivi', 'index'],
  host: {
    'class': 'col-xs-6 edit-card'
  }
})
export class ZiviSettingsComponent implements OnInit {
  zivi: Zivi;
  originalZivi: Zivi;
  index: number;
  loading: boolean;
  error: any;
  editing = false;

  constructor(private ziviService: ZiviService, private colorService: ColorService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.editing = this.zivi.create;
  }

  updateZivi() {
    if (!this.checkZiviForSaving()) {
      return;
    }
    let ziviHex: string;
    this.colorService.convertColorToHex(this.zivi.color).subscribe(hex => ziviHex = hex);
    if (ziviHex === null) {
      this.zivi.color = 'black';
      this.zivi.colorHex = '#000000';
    } else {
      this.zivi.colorHex = ziviHex;
    }


    // TODO: Check for duplicate names
    this.ziviService.updateZivi(this.originalZivi.name, this.zivi)
      .subscribe(
        updated => this.handleWriteSuccess(updated),
        error => this.handleWriteError(error),
        () => this.loading = false
      );
  }

  handleWriteSuccess(res: Zivi) {
    this.zivi = res;
    this.originalZivi = res;
    this.error = false;
    this.editing = false;
    this.loading = false;
  }

  handleWriteError(error: any) {
    this.error = error;
    this.loading = false;
  }

  checkZiviForSaving(): boolean {
    let result;
    if (!this.zivi || !this.zivi.name) {
      result = 'Name ist ein Pflichtfeld.';
    } else if (!this.zivi.color || !this.zivi.colorHex) {
      result = 'Dieser Zivi ist zu farblos.';
    } else if (this.loading) {
      result = 'Es läuft bereits ein Speichervorgang.';
    }
    this.zivi.addresses = this.zivi.addresses.filter(el => !!el);
    if (this.zivi.create) {
      this.zivi.create = undefined;
    }
    if (result) {
      toast(result, 2000);
      return false;
    } else {
      this.loading = true;
      return true;
    }
  }

  createZivi() {
    if (!this.checkZiviForSaving()) {
      return;
    }
    this.ziviService.createNewZivi(this.zivi)
      .subscribe(
        updated => this.handleWriteSuccess(updated),
        error => this.handleWriteError(error)
      );
  }

  startEditing() {
    this.originalZivi = this.zivi.clone();
    this.editing = true;
  }

  cancelEditing() {
    this.editing = false;
    if (this.zivi.create) {
      this.ziviService.getZiviUpdates().next('delete');
    } else {
      this.zivi = this.originalZivi;
    }
  }

  deleteZivi() {
    this.loading = true;
    console.log(' ### Deleting Zivi', this.zivi);
    this.ziviService.deleteZivi(this.zivi.name)
      .subscribe(
        () => toast('Zivi ' + this.zivi.name + ' gelöscht.', 4000),
        error => {
          toast('Fehler beim Löschen.', 4000);
          console.error('Fehler beim Löschen von', this.zivi, error);
        }
      );
  }

  // noinspection JSMethodCanBeStatic
  trackByIndex(index: number) {
    return index;
  }

  createBackgroundColorStyle() {
    let hexColorRe = /#[0-9a-zA-Z]{3,6}/;
    if (!this.zivi.colorHex || !this.zivi.colorHex.startsWith('#') || !this.zivi.colorHex.match(hexColorRe)) {
      return '';
    } else {
      return this.sanitizer.bypassSecurityTrustStyle('background-color: ' + this.zivi.colorHex);
    }
  }

  getRandomColor(): void {
    let color: ColorPair;
    this.colorService.getRandomColor().subscribe(rancolor => color = rancolor);
    this.zivi.color = color.color;
    this.zivi.colorHex = color.hex;
  }
}
