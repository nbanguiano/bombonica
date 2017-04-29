import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';

import { IngredientDetailsComponent } from '../ingredient-details/ingredient-details.component';

@Component({
  selector: 'ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
  providers: [IngredientService]
})

export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[]
  selectedIngredient: Ingredient

  constructor(private ingredientService: IngredientService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.ingredientService
        .getIngredients()
        .then((ingredients: Ingredient[]) => {this.ingredients = ingredients});

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let ingredientId = params['id'];
      if (ingredientId && ingredientId !== "undefined") {
        this.ingredientService.getOneIngredient(ingredientId)
            .then((ingredient: Ingredient) => {this.selectIngredient(ingredient)})
      }
    });

  }

  private getIndexOfIngredient = (ingredientId: String) => {
    return this.ingredients.findIndex((ingredient) => {
      return ingredient._id === ingredientId;
    });
  };

  selectIngredient(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }

  createNewIngredient() {
    var ingredient: Ingredient = {
      name: '',
      meassure: '',
      cost: 0
    };
    // By default, a newly-created contact will have the selected state.
    this.selectIngredient(ingredient);
  }

  deleteIngredient = (ingredientId: String) => {
    var idx = this.getIndexOfIngredient(ingredientId);
    if (idx !== -1) {
      this.ingredients.splice(idx, 1);
      this.selectIngredient(null);
    }
    return this.ingredients;
  }

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.selectIngredient(ingredient);
    return this.ingredients;
  }

  updateIngredient = (ingredient: Ingredient) => {
    var idx = this.getIndexOfIngredient(ingredient._id);
    if (idx !== -1) {
      this.ingredients[idx] = ingredient;
      this.selectIngredient(ingredient);
    }
    return this.ingredients;
  }
}
