export class Recipe {
  _id?: string;
  name: string;
  ingredients: IngredientInput[];
  source: string;
  type: string;
  cost: number;
}

export class IngredientInput {
  name: string;
  qty: number;
  cost: number;
}