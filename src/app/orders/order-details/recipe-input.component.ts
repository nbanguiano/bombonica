import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Recipe } from '../../recipes/recipe';

@Component({
    selector: 'recipe-input',
    templateUrl: 'recipe-input.component.html'
})
export class RecipeInputComponent {
  @Input('recipeForm')
  public recipeForm: FormGroup;

  @Input()
  recipes: Recipe[];

}
