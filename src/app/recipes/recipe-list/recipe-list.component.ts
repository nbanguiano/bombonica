import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Recipe, IngredientInput } from '../recipe';
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
  // To display the list of recipes
  recipes: Recipe[]
  // To @Input into the recipes details  
  selectedRecipe: Recipe
  // To @Input into the recipes details, and feed the ingredients dropdown
  ingredients: Ingredient[]
  // To generate the populated FormGroup to be displayed in the recipe details
  recipeForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.recipeService
        .getRecipes()
        .then((recipes: Recipe[]) => {this.recipes = recipes});

    this.ingredientService
        .getIngredients()
        .then((ingredients: Ingredient[]) => {this.ingredients = ingredients});

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let recipeId = params['id'];
      if (recipeId && recipeId !== "undefined") {
        this.recipeService.getOneRecipe(recipeId)
            .then((recipe: Recipe) => {this.selectRecipe(recipe)})
      }
    });
  }


  private getIndexOfRecipe = (recipeId: String) => {
    return this.recipes.findIndex((recipe) => {
      return recipe._id === recipeId;
    });
  };

  selectRecipe(recipe: Recipe) {
    // This the given recipe as the selected one.
    this.selectedRecipe = recipe;
    if (recipe) {
      // Generate a FormGroup based on this recipe.
      this.recipeForm = this._fb.group({
        _id: [(recipe._id)?(recipe._id):null],
        name: [recipe.name],
        type: [recipe.type],
        source: [recipe.source],
        ingredients: this._fb.array([]),
        cost: recipe.cost
      });
      // Add all the ingredients to the form group.
      const control = <FormArray>this.recipeForm.controls['ingredients'];
      recipe.ingredients.forEach(ingredient => {
        control.push(this._fb.group(ingredient));  
      });
    }
  }

  createNewRecipe() {
    var recipe: Recipe = {
      name: '',
      ingredients: [{
        id: '',
        qty: 0
      }],
      type: '',
      cost: 0,
      source: ''
    };
    // By default, a newly-created recipe will have the selected state.
    this.selectRecipe(recipe);
    // Init the list again, to get the last changes on the recipe model.
    // This extra call to ngOnInit is only needed in this case, since we are using
    // FormGroups to bind the user input, rather than the recipe class directly.
    // Same explanation applies for all subsequent calls to ngOnInit.
    this.ngOnInit();
  }

  deleteRecipe = (recipeId: String) => {
    var idx = this.getIndexOfRecipe(recipeId);
    if (idx !== -1) {
      this.recipes.splice(idx, 1);
      this.selectRecipe(null);
    }
    this.ngOnInit();
    return this.recipes;
  }

  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe);
    this.selectRecipe(recipe);
    this.ngOnInit();
    return this.recipes;
  }

  updateRecipe = (recipe: Recipe) => {
    var idx = this.getIndexOfRecipe(recipe._id);
    if (idx !== -1) {
      this.recipes[idx] = recipe;
      this.selectRecipe(recipe);
    }
    this.ngOnInit();
    return this.recipes;
  }
}
