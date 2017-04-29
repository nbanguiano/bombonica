import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Order, RecipeInput, ComplementInput } from '../order';
import { Contact } from '../../contacts/contact';
import { Recipe } from '../../recipes/recipe';
import { Complement } from '../../complements/complement';
import { OrderService } from '../order.service';
import { ContactService } from '../../contacts/contact.service';
import { RecipeService } from '../../recipes/recipe.service';
import { ComplementService } from '../../complements/complement.service';

import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService, ContactService, RecipeService, ComplementService]
})

export class OrderListComponent implements OnInit {

  orders: Order[];

  selectedOrder: Order;

  contacts: Contact[];

  recipes: Recipe[];

  complements: Complement[];

  orderForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private orderService: OrderService, 
              private contactService: ContactService,
              private recipeService: RecipeService,
              private complementService: ComplementService,
              private activatedRoute: ActivatedRoute) {}


  ngOnInit() {
    this.orderService
        .getOrders()
        .then((orders: Order[]) => {this.orders = orders});
    
    this.contactService
        .getContacts()
        .then((contacts: Contact[]) => {
          this.contacts = contacts;
        });
    
    this.recipeService
        .getRecipes()
        .then((recipes: Recipe[]) => {
          this.recipes = recipes;
        });

    this.complementService
        .getComplements()
        .then((complements: Complement[]) => {
          this.complements = complements;
        })

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let orderId = params['id'];
      if (orderId && orderId !== "undefined") {
        this.orderService.getOneOrder(orderId)
            .then((order: Order) => {this.selectOrder(order)})
      }
    });

  }

  private getIndexOfOrder = (orderId: String) => {
    return this.orders.findIndex((order) => {
      return order._id === orderId;
    });
  };


  selectOrder(order: Order) {
    // This the given recipe as the selected one.
    this.selectedOrder = order;
    if (order) {
      // Generate a FormGroup based on this recipe.
      this.orderForm = this._fb.group({
        _id: [(order._id)?(order._id):null],
        name: [order.name],
        contactId: [order.contactId],
        recipes: this._fb.array([]),
        complements: this._fb.array([]),
        event: order.event,
        price: order.price,
        cost: order.cost,
        date: order.date
      });
      // Add all the recipes to the form group.
      const recipeControl = <FormArray>this.orderForm.controls['recipes'];
      order.recipes.forEach(recipe => {
        recipeControl.push(this._fb.group(recipe));  
      });
      // Add all the recipes to the form group.
      const complementControl = <FormArray>this.orderForm.controls['complements'];
      order.complements.forEach(complement => {
        complementControl.push(this._fb.group(complement));  
      });
    }
  }

  createNewOrder() {
    var order: Order = {
      name: '',
      contactId: '',
      recipes: [{
        id: '',
        qty: 0
      }],
      complements: [{
        id: '',
        qty: 0
      }],
      event: '',
      price: 0,
      cost: 0,
      date: ''
    };
    // By default, a newly-created contact will have the selected state.
    this.selectOrder(order);
    // Init the list again, to get the last changes on the order model.
    // This extra call to ngOnInit is only needed in this case, since we are using
    // FormGroups to bind the user input, rather than the order class directly.
    // Same explanation applies for all subsequent calls to ngOnInit.
    this.ngOnInit();
  }

  deleteOrder = (orderId: String) => {
    var idx = this.getIndexOfOrder(orderId);
    if (idx !== -1) {
      this.orders.splice(idx, 1);
      this.selectOrder(null);
    }
    this.ngOnInit();
    return this.orders;
  }

  addOrder = (order: Order) => {
    this.orders.push(order);
    this.selectOrder(order);
    this.ngOnInit();
    return this.orders;
  }

  updateOrder = (order: Order) => {
    var idx = this.getIndexOfOrder(order._id);
    if (idx !== -1) {
      this.orders[idx] = order;
      this.selectOrder(order);
    }
    this.ngOnInit();
    return this.orders;
  }
}
