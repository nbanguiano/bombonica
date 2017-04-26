import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../order';
import { Contact } from '../../contacts/contact';
import { Recipe } from '../../recipes/recipe';
import { Image } from '../../images/image';
import { OrderService } from '../order.service';
import { ContactService } from '../../contacts/contact.service';
import { RecipeService } from '../../recipes/recipe.service';
import { ImageService } from '../../images/image.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService, ContactService, RecipeService, ImageService]
})

export class OrderListComponent implements OnInit, OnDestroy {

  orders: Order[];
  selectedOrder: Order;

  contacts: Contact[];

  recipes: Recipe[];

  images: Image[];

  imgSubscription: Subscription;

  message: any;

  constructor(private orderService: OrderService, 
              private contactService: ContactService,
              private recipeService: RecipeService,
              private imageService: ImageService) {
                this.imgSubscription = this.imageService.getImageUpdate().subscribe((images: Image[]) => {
                  this.images = images;
                });
              }


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
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.imgSubscription.unsubscribe();
  }

  private getIndexOfOrder = (orderId: String) => {
    return this.orders.findIndex((order) => {
      return order._id === orderId;
    });
  };

  selectOrder(order: Order) {
    this.selectedOrder = order;
    if (order) {
      this.updateImageList(order._id);
    }
  }

  updateImageList = (orderId: String) => {
      this.imageService
          .getImagesByOrder(orderId)
          .then((images: Image[]) => {
            this.images = images;
          })
  }

  createNewOrder() {
    var order: Order = {
      name: '',
      contactId: '',
      recipeId: '',
      event: '',
      price: 0,
      date: ''
    };
    // By default, a newly-created contact will have the selected state.
    this.selectOrder(order);
  }

  deleteOrder = (orderId: String) => {
    var idx = this.getIndexOfOrder(orderId);
    if (idx !== -1) {
      this.orders.splice(idx, 1);
      this.selectOrder(null);
    }
    return this.orders;
  }

  addOrder = (order: Order) => {
    this.orders.push(order);
    this.selectOrder(order);
    return this.orders;
  }

  updateOrder = (order: Order) => {
    var idx = this.getIndexOfOrder(order._id);
    if (idx !== -1) {
      this.orders[idx] = order;
      this.selectOrder(order);
    }
    return this.orders;
  }
}
