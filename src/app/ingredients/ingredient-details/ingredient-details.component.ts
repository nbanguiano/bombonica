import { Component, Input } from '@angular/core';
import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.css'],
  providers: [RecipeService]
})

export class IngredientDetailsComponent {
  @Input()
  ingredient: Ingredient;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private ingredientService: IngredientService,
              private recipeService: RecipeService) {}

  meassures = [
    {id: "Ud.", label: "Unidad"},
    {id: "Kg", label: "Kilo"},
    {id: "gr", label: "Gramo"},
    {id: "Lt", label: "Litro"},
    {id: "ml", label: "Mililitro"}
  ];

  createIngredient(ingredient: Ingredient) {
    this.ingredientService.createIngredient(ingredient)
                          .then((newIngredient: Ingredient) => {
                            this.createHandler(newIngredient);
                          });
  }

  updateIngredient(ingredient: Ingredient) {
    this.ingredientService.updateIngredient(ingredient)
                          .then((updatedIngredient: Ingredient) => {
                            this.recipeService.updateAllCosts();
                            this.updateHandler(updatedIngredient);
                          });
  }

  deleteIngredient(ingredientId: String) {
    this.ingredientService.deleteIngredient(ingredientId)
                          .then((deletedIngredientId: String) => {
                            this.recipeService.updateAllCosts();
                            this.deleteHandler(deletedIngredientId);
                          });
  }

}
