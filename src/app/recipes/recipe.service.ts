import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';
import { UserService } from '../common/user.service';

@Injectable()
export class RecipeService {

  constructor(private http: Http,
              private user: UserService) {}

  private recipesUrl = '/api/recipes';

  private signUri(uri) {
    return uri + '?token=' + this.user.getToken();
  }

  // get("/api/recipes")
  getRecipes(): Promise<Recipe[]>{
    return this.http.get(this.signUri(this.recipesUrl))
               .toPromise()
               .then(response => response.json() as Recipe[])
               .catch(this.handleError);
  }

  // post("/api/recipes")
  createRecipe(newRecipe: Recipe): Promise<Recipe> {
    return this.http.post(this.signUri(this.recipesUrl), newRecipe)
               .toPromise()
               .then(response => response.json() as Recipe)
               .catch(this.handleError);
  }

  // get("/api/recipes/:id") endpoint not used by the app

  // put("/api/recipes/:id")
  updateRecipe(putRecipe: Recipe): Promise<Recipe> {
    var putUrl = this.signUri(this.recipesUrl + '/' + putRecipe._id);
    return this.http.put(putUrl, putRecipe)
               .toPromise()
               .then(response => response.json() as Recipe)
               .catch(this.handleError);
  }

  // delete("/api/recipes/:id")
  deleteRecipe(delRecipeId: String): Promise<String> {
    return this.http.delete(this.signUri(this.recipesUrl + '/' + delRecipeId))
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
