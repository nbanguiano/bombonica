export class Order {
  _id?: string;
  name: string;
  contactId: string;
  recipes: RecipeInput[];
  complements: ComplementInput[];
  event: string;
  price: number;
  cost: number;
  date: string;
}

export class RecipeInput {
  id: string;
  qty: number;
}

export class ComplementInput {
  id: string;
  qty: number;
}
