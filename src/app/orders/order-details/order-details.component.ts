import { Component, Input } from '@angular/core';
import { Order } from '../order';
import { Contact } from '../../contacts/contact';
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
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private orderService: OrderService) {}

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
