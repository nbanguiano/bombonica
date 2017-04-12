import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { Contact } from '../../contacts/contact';
import { OrderService } from '../order.service';
import { ContactService } from '../../contacts/contact.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService, ContactService]
})

export class OrderListComponent implements OnInit {

  orders: Order[]
  selectedOrder: Order

  contacts: Contact[]

  constructor(private orderService: OrderService, 
              private contactService: ContactService) {}

  ngOnInit() {
    this.orderService
        .getOrders()
        .then((orders: Order[]) => {this.orders = orders});
    
    this.contactService
        .getContacts()
        .then((contacts: Contact[]) => {
          this.contacts = contacts;
        });
  }

  private getIndexOfOrder = (orderId: String) => {
    return this.orders.findIndex((order) => {
      return order._id === orderId;
    });
  };

  selectOrder(order: Order) {
    this.selectedOrder = order;
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
