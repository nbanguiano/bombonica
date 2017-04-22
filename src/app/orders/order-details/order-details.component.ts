import { Component, Input } from '@angular/core';
//import { CalendarModule } from 'primeng/primeng';
import { ImageInputComponent } from '../../images/image-input/image-input.component';

import { Order } from '../order';
import { Contact } from '../../contacts/contact';
import { Recipe } from '../../recipes/recipe';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input()
  order: Order;
  @Input()
  contacts: Contact[];
  @Input()
  recipes: Recipe[];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private orderService: OrderService) {}

  events = [
    {id: 1, label: "Cumpleaños"},
    {id: 2, label: "Aniversario"},
    {id: 3, label: "Matrimonio"},
    {id: 4, label: "Nacimiento"},
    {id: 5, label: "Otro"}
  ];

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
