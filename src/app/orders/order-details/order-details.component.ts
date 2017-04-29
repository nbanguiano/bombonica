import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Order } from '../order';
import { Contact } from '../../contacts/contact';
import { Recipe } from '../../recipes/recipe';
import { Complement } from '../../complements/complement';
import { Image } from '../../images/image';

import { RecipeService } from '../../recipes/recipe.service';
import { ComplementService } from '../../complements/complement.service';
import { ImageService } from '../../images/image.service';
import { OrderService } from '../order.service';

import { ImageListComponent } from '../../images/image-list/image-list.component';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService, ImageService]
})
export class OrderDetailsComponent implements OnChanges {
  @Input()
  order: Order;
  @Input()
  contacts: Contact[];
  @Input()
  recipes: Recipe[];
  @Input()
  complements: Complement[];
  @Input('orderForm')
  orderForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  images: Image[];

  constructor(private _fb: FormBuilder,
              private orderService: OrderService,
              private recipeService: RecipeService,
              private complementService: ComplementService,
              private imageService: ImageService,
              private location: Location) {}

  ngOnChanges() {
    if (this.order) {
      this.imageService.getImagesByOrder(this.order._id)
          .then((images: Image[]) => {
            this.images = images;
          })

      this.location.replaceState("/admin/orders/" + this.order._id);
    }
  }

  events = [
    {id: 1, label: "Cumpleaños"},
    {id: 2, label: "Aniversario"},
    {id: 3, label: "Matrimonio"},
    {id: 4, label: "Nacimiento"},
    {id: 5, label: "Bautizo"},
    {id: 6, label: "Confirmación"},
    {id: 7, label: "Fiesta de empresa"},
    {id: 8, label: "Otro"}
  ];

  initRecipe() {
    return this._fb.group({
      id: [''],
      qty: [0]
    });
  }
  addRecipes() {
    const control = <FormArray>this.orderForm.controls['recipes'];
    const recipeCtrl = this.initRecipe();
    control.push(recipeCtrl);
  }
  removeRecipe(i: number) {
    const control = <FormArray>this.orderForm.controls['recipes'];
    control.removeAt(i);
  }


  initComplement() {
    return this._fb.group({
      id: [''],
      qty: [0]
    });
  }
  addComplements() {
    const control = <FormArray>this.orderForm.controls['complements'];
    const complementCtrl = this.initComplement();
    control.push(complementCtrl);
  }
  removeComplement(i: number) {
    const control = <FormArray>this.orderForm.controls['complements'];
    control.removeAt(i);
  }

  createOrder(order: Order) {
    this.orderService.createOrder(order)
                     .then((newOrder: Order) => {
                       this.createHandler(newOrder);
                     });
  }

  updateOrder(order: Order) {
    this.orderService.updateOrder(order)
                     .then((updatedOrder: Order) => {
                       this.updateHandler(updatedOrder);
                     });
  }

  deleteOrder(orderId: String) {
    this.orderService.deleteOrder(orderId)
                     .then((deletedOrderId: String) => {
                      this.deleteHandler(deletedOrderId);
                     });
  }

}
