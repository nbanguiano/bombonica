import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { UserService } from '../common/user.service';

@Injectable()
export class IngredientService {

  constructor(private http: Http,
              private user: UserService) {}

  private ingredientsUrl = '/api/ingredients';

  private signUri(uri) {
    return uri + '?token=' + this.user.getToken();
  }

  // get("/api/ingredients")
  getIngredients(): Promise<Ingredient[]>{
    return this.http.get(this.signUri(this.ingredientsUrl))
               .toPromise()
               .then(response => response.json() as Ingredient[])
               .catch(this.handleError);
  }

  // post("/api/ingredients")
  createIngredient(newIngredient: Ingredient): Promise<Ingredient> {
    return this.http.post(this.signUri(this.ingredientsUrl), newIngredient)
               .toPromise()
               .then(response => response.json() as Ingredient)
               .catch(this.handleError);
  }

  // get("/api/ingredients/:id")
  getOneIngredient(ingredientId: String): Promise<Ingredient>{
    return this.http.get(this.signUri(this.ingredientsUrl + '/' + ingredientId))
               .toPromise()
               .then(response => response.json() as Ingredient)
               .catch(this.handleError);
  }

  // put("/api/ingredients/:id")
  updateIngredient(putIngredient: Ingredient): Promise<Ingredient> {
    var putUrl = this.signUri(this.ingredientsUrl + '/' + putIngredient._id);
    return this.http.put(putUrl, putIngredient)
               .toPromise()
               .then(response => response.json() as Ingredient)
               .catch(this.handleError);
  }

  // delete("/api/ingredients/:id")
  deleteIngredient(delIngredientId: String): Promise<String> {
    return this.http.delete(this.signUri(this.ingredientsUrl + '/' + delIngredientId))
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
