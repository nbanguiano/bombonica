import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Ingredient } from '../../ingredients/ingredient';

@Component({
    selector: 'ingredient-input',
    templateUrl: 'ingredient-input.component.html'
})
export class IngredientInputComponent {
  @Input('ingredientForm')
  public ingredientForm: FormGroup;

  @Input()
  ingredients: Ingredient[];

}
