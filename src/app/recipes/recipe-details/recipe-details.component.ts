import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Recipe } from '../recipe';
import { Ingredient } from '../../ingredients/ingredient';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../../ingredients/ingredient.service';
import { OrderService } from '../../orders/order.service';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  providers: [OrderService]
})
export class RecipeDetailsComponent implements OnChanges {
  @Input()
  recipe: Recipe;
  @Input()
  ingredients: Ingredient[];
  @Input('recipeForm')
  recipeForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private _fb: FormBuilder,
              private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private orderService: OrderService,
              private location: Location) {}

  types = [
    {id: 1, label: "Normal"},
    {id: 2, label: "Saludable"},
    {id: 3, label: "Sin huevo"},
    {id: 4, label: "Otro"}
  ];

  sources = [
    {id: 1, label: "Curso"},
    {id: 2, label: "Internet"},
    {id: 3, label: "Libro"},
    {id: 4, label: "Familia"},
    {id: 5, label: "Otro"}
  ];

  ngOnChanges() {
    if (this.recipe) {
      this.location.replaceState("/admin/recipes/" + this.recipe._id);
    }
  }
  
  initIngredient() {
    return this._fb.group({
      id: [''],
      qty: [0]
    });
  }

  addIngredients() {
    const control = <FormArray>this.recipeForm.controls['ingredients'];
    const ingredientCtrl = this.initIngredient();
    control.push(ingredientCtrl);
  }

  removeIngredient(i: number) {
    const control = <FormArray>this.recipeForm.controls['ingredients'];
    control.removeAt(i);
  }

  createRecipe(recipe: Recipe) {
    this.recipeService.createRecipe(recipe)
                      .then((newRecipe: Recipe) => {
                        this.createHandler(newRecipe);
                      });
  }

  updateRecipe(recipe: Recipe) {
    this.recipeService.updateRecipe(recipe)
                      .then((updatedRecipe: Recipe) => {
                        this.updateHandler(updatedRecipe);
                      });
  }

  deleteRecipe(recipeId: String) {
    this.recipeService.deleteRecipe(recipeId)
                      .then((deletedRecipeId: String) => {
                        this.deleteHandler(deletedRecipeId);
                      });
  }

}
