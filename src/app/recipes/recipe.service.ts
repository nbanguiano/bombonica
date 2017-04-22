import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';
import { Ingredient } from '../ingredients/ingredient';
import { UserService } from '../common/user.service';
import { IngredientService } from '../ingredients/ingredient.service';

@Injectable()
export class RecipeService {

  ingredients: Ingredient[];

  constructor(private http: Http,
              private user: UserService,
              private ingredientService: IngredientService) {
                // Initialize ingredients from database
                this.ingredientService.getIngredients()
                    .then((ingredients: Ingredient[]) => {
                      this.ingredients = ingredients;
                    });
              }

  private recipesUrl = '/api/recipes';

  // get("/api/recipes")
  getRecipes(): Promise<Recipe[]>{
    return this.http.get(this.user.signUri(this.recipesUrl))
               .toPromise()
               .then(response => response.json() as Recipe[])
               .catch(this.handleError);
  }

  // post("/api/recipes")
  createRecipe(newRecipe: Recipe): Promise<Recipe> {
    newRecipe = this.calculateRecipeCost(newRecipe);
    return this.http.post(this.user.signUri(this.recipesUrl), newRecipe)
               .toPromise()
               .then(response => response.json() as Recipe)
               .catch(this.handleError);
  }

  // get("/api/recipes/:id")
  getOneRecipe(recipeId: String): Promise<Recipe>{
    return this.http.get(this.user.signUri(this.recipesUrl + '/' + recipeId))
               .toPromise()
               .then(response => response.json() as Recipe)
               .catch(this.handleError);
  }

  // put("/api/recipes/:id")
  updateRecipe(putRecipe: Recipe): Promise<Recipe> {
    putRecipe = this.calculateRecipeCost(putRecipe);
    var putUrl = this.user.signUri(this.recipesUrl + '/' + putRecipe._id);
    return this.http.put(putUrl, putRecipe)
               .toPromise()
               .then(response => response.json() as Recipe)
               .catch(this.handleError);
  }

  // delete("/api/recipes/:id")
  deleteRecipe(delRecipeId: String): Promise<String> {
    return this.http.delete(this.user.signUri(this.recipesUrl + '/' + delRecipeId))
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  private calculateRecipeCost(recipe: Recipe) {
    recipe.cost = 0;
    recipe.ingredients.forEach(userIngredient => {
      this.ingredients.forEach(dbIngredient => {
        if (userIngredient.id === dbIngredient._id) {
          recipe.cost += (dbIngredient.cost * userIngredient.qty);
        };
      });
    });
    return recipe;
  }

  updateAllCosts() {
    // Mainly intended to be called from the ingredient-detail component
    //   when updating an ingredient, always suspecting that
    //   the price of the ingredient might have changed.
    // This would update all ingredients used by this service
    //   and then update each reacipe, which in turn is recalculating the costs.
    this.ingredientService.getIngredients()
        .then((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          this.getRecipes()
              .then((recipes: Recipe[]) => {
                recipes.forEach((recipe: Recipe) => {
                  this.updateRecipe(recipe);
                });
              });
        });
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
