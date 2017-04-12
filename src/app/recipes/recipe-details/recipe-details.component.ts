import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this._fb.group({
      name: '',
      ingredients: this._fb.array([])
    });

    // add ingredient
    this.addIngredients();
  }

  initIngredient() {
    return this._fb.group({
      name: '',
      qty: 0
    });
  }

  addIngredients() {
    const control = <FormArray>this.myForm.controls['ingredients'];
    const ingredientCtrl = this.initIngredient();

    control.push(ingredientCtrl);
  }

  removeIngredient(i: number) {
    const control = <FormArray>this.myForm.controls['ingredients'];
    control.removeAt(i);
  }

  save(model: Recipe) {
      // call API to save
      // ...
      console.log(model);
  }

}
