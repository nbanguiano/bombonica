import { Ingredient } from '../ingredients/ingredient'

export class Recipe {
  _id?: string;
  name: string;
  ingredients: Ingredient[];
  source: string;
  type: string;
  cost: number;
}
