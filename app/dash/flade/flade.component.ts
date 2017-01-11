import {Component} from '@angular/core';
import {FladeService, Flade} from '../../services/flade.service';

@Component({
  selector: 'flade',
  templateUrl: 'app/dash/flade/flade.component.html'
})
export class FladeComponent {

  flade: Flade = new Flade('Flade Of the day', new Date());

  constructor(private fladeService: FladeService) {
    fladeService.getCurrentFlade().subscribe(flade => this.flade = flade);
  }

}
