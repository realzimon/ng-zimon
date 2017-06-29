import {Component} from '@angular/core';
import {FladeService, Flade, FladeResult} from '../../services/flade.service';

@Component({
  selector: 'flade',
  templateUrl: 'app/dash/flade/flade.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class FladeComponent {
  flade: Flade = new Flade('... [f]laden ...', new Date());
  error = false;

  constructor(private fladeService: FladeService) {
    fladeService.getChangeObservable().subscribe(res => this.setFladeFromResult(res));
    this.updateFlade();
  }

  private updateFlade() {
    this.fladeService.getCurrentFlade()
      .retryWhen(errors => {
        this.error = true;
        return errors.delay(120000);
      })
      .subscribe(res => this.setFladeFromResult(res));
  }

  private setFladeFromResult(res: FladeResult) {
    this.flade = res.flade;
    this.error = res.error;
    if (res.error) {
      console.error('Error retrieving Flade', res.error);
    }
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 70 /* f */) {
      this.updateFlade();
    }
  }
}
