import { Component, Input, OnChanges } from '@angular/core';

import { Order } from '../order';
import { Contact } from '../../contacts/contact';
import { Recipe } from '../../recipes/recipe';
import { Image } from '../../images/image';
import { ImageService } from '../../images/image.service';
import { OrderService } from '../order.service';

import { ImageListComponent } from '../../images/image-list/image-list.component';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [ImageService]
})
export class OrderDetailsComponent implements OnChanges {
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

  images: Image[];

  constructor(private orderService: OrderService,
              private imageService: ImageService) {}

  ngOnChanges() {
    if (this.order) {
      this.imageService.getImagesByOrder(this.order._id)
          .then((images: Image[]) => {
            this.images = images;
          }) 
    }
  }

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
