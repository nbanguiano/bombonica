import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../order';

@Component({
  selector: 'order-list-contact',
  templateUrl: './order-list-contact.component.html',
  styleUrls: ['./order-list-contact.component.css']
})
export class OrderListContactComponent {

  @Input()
  orders: Order[]

  constructor(private router: Router) {}

  navigateTo(order: Order) {
    this.router.navigate(['/admin/orders', order._id]);
  }

}
