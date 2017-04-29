import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Order } from './order';
import { Recipe } from '../recipes/recipe';
import { RecipeService } from '../recipes/recipe.service';
import { Complement } from '../complements/complement';
import { ComplementService } from '../complements/complement.service';
import { UserService } from '../common/user.service';

@Injectable()
export class OrderService {

  recipes: Recipe[]

  complements: Complement[]

  constructor(private http: Http,
              private user: UserService,
              private recipeService: RecipeService,
              private complementService: ComplementService) {
                // Initialize recipes from database
                this.recipeService.getRecipes()
                    .then((recipes: Recipe[]) => {
                      this.recipes = recipes;
                    });

                // Initialize complements from database
                this.complementService.getComplements()
                    .then((complements: Complement[]) => {
                      this.complements = complements;
                    });
              }

  private ordersUrl = '/api/orders';

  // get("/api/orders")
  getOrders(): Promise<Order[]>{
    return this.http.get(this.user.signUri(this.ordersUrl))
               .toPromise()
               .then(response => response.json() as Order[])
               .catch(this.handleError);
  }

  // get("/api/orders/byContact/:contactId")
  getOrdersByContactId(contactId: String): Promise<Order[]>{
    return this.http.get(this.user.signUri(this.ordersUrl + '/byContact/' + contactId))
               .toPromise()
               .then(response => response.json() as Order[])
               .catch(this.handleError);
  }

  // post("/api/orders")
  createOrder(newOrder: Order): Promise<Order> {
    newOrder = this.calculateOrderCost(newOrder);
    return this.http.post(this.user.signUri(this.ordersUrl), newOrder)
               .toPromise()
               .then(response => response.json() as Order)
               .catch(this.handleError);
  }

  // get("/api/orders/:id") endpoint not used by the app
  getOneOrder(orderId: String): Promise<Order>{
  return this.http.get(this.user.signUri(this.ordersUrl + '/' + orderId))
              .toPromise()
              .then(response => response.json() as Order)
              .catch(this.handleError);
  }

  // put("/api/orders/:id")
  updateOrder(putOrder: Order): Promise<Order> {
    putOrder = this.calculateOrderCost(putOrder);
    var putUrl = this.user.signUri(this.ordersUrl + '/' + putOrder._id);
    return this.http.put(putUrl, putOrder)
               .toPromise()
               .then(response => response.json() as Order)
               .catch(this.handleError);
  }

  // delete("/api/orders/:id")
  deleteOrder(delOrderId: String): Promise<String> {
    return this.http.delete(this.user.signUri(this.ordersUrl + '/' + delOrderId))
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  private calculateOrderCost(order: Order) {
    order.cost = 0;
    order.recipes.forEach(userRecipe => {
      this.recipes.forEach(dbRecipe => {
        if (userRecipe.id === dbRecipe._id) {
          order.cost += (dbRecipe.cost * userRecipe.qty);
        };
      });
    });
    order.complements.forEach(userComplement => {
      this.complements.forEach(dbComplement => {
        if (userComplement.id === dbComplement._id) {
          order.cost += (dbComplement.cost * userComplement.qty);
        };
      });
    });
    return order;
  }

/*
  updateCostsAfterRecipeChange() {
    // Mainly intended to be called from the recipe-detail component
    //   when updating an recipe, always suspecting that
    //   the price of the recipe might have changed.
    // This would update all recipes used by this service
    //   and then update each reacipe, which in turn is recalculating the costs.
    this.recipeService.getRecipes()
        .then((recipes: Recipe[]) => {
          this.recipes = recipes;
          this.getOrders()
              .then((orders: Order[]) => {
                orders.forEach((order: Order) => {
                  this.updateOrder(order);
                });
              });
        });
  }

  updateCostsAfterComplementChange() {
    // Mainly intended to be called from the complement-detail component
    //   when updating an complement, always suspecting that
    //   the price of the complement might have changed.
    // This would update all complements used by this service
    //   and then update each reacipe, which in turn is recalculating the costs.
    this.complementService.getComplements()
        .then((complements: Complement[]) => {
          this.complements = complements;
          this.getOrders()
              .then((orders: Order[]) => {
                orders.forEach((order: Order) => {
                  this.updateOrder(order);
                });
              });
        });
  }
*/

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
