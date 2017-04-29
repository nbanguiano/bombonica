import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Complement } from '../../complements/complement';

@Component({
    selector: 'complement-input',
    templateUrl: 'complement-input.component.html'
})
export class ComplementInputComponent {
  @Input('complementForm')
  public complementForm: FormGroup;

  @Input()
  complements: Complement[];

}
