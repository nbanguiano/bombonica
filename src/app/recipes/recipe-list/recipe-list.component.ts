import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../ingredients/ingredient';
import { IngredientService } from '../../ingredients/ingredient.service';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService, IngredientService]
})

export class RecipeListComponent implements OnInit {

  recipes: Recipe[]
  selectedRecipe: Recipe

  ingredients: Ingredient[]

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService) {}

  ngOnInit() {
    this.recipeService
        .getRecipes()
        .then((recipes: Recipe[]) => {this.recipes = recipes});

    this.ingredientService
        .getIngredients()
        .then((ingredients: Ingredient[]) => {this.ingredients = ingredients});
 }

  private getIndexOfRecipe = (recipeId: String) => {
    return this.recipes.findIndex((recipe) => {
      return recipe._id === recipeId;
    });
  };

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  createNewRecipe() {
    var recipe: Recipe = {
      name: '',
      ingredients: [],
      type: '',
      cost: 0,
      source: ''
    };
    // By default, a newly-created contact will have the selected state.
    this.selectRecipe(recipe);
  }

  deleteRecipe = (recipeId: String) => {
    var idx = this.getIndexOfRecipe(recipeId);
    if (idx !== -1) {
      this.recipes.splice(idx, 1);
      this.selectRecipe(null);
    }
    return this.recipes;
  }

  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe);
    this.selectRecipe(recipe);
    return this.recipes;
  }

  updateRecipe = (recipe: Recipe) => {
    var idx = this.getIndexOfRecipe(recipe._id);
    if (idx !== -1) {
      this.recipes[idx] = recipe;
      this.selectRecipe(recipe);
    }
    return this.recipes;
  }
}
