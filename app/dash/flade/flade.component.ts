import {Component} from '@angular/core';
import {FladeService, Flade} from '../../services/flade.service';

@Component({
  selector: 'flade',
  templateUrl: 'app/dash/flade/flade.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class FladeComponent {
  flade: Flade = new Flade('... [f]laden ...', new Date());

  constructor(private fladeService: FladeService) {
    fladeService.getChangeObservable().subscribe(flade => this.flade = flade);
    this.updateFlade();
  }

  private updateFlade() {
    this.fladeService.getCurrentFlade().subscribe(flade => this.flade = flade);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 70 /* F */) {
      this.updateFlade();
    }
  }
}
