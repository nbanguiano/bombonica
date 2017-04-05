import { Injectable } from '@angular/core';
import { Order } from './order';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
  private ordersUrl = '/api/orders';

  constructor(private http: Http) {}

  // get("/api/orders")
  getOrders(): Promise<Order[]>{
    return this.http.get(this.ordersUrl)
               .toPromise()
               .then(response => response.json() as Order[])
               .catch(this.handleError);
  }

  // post("/api/orders")
  createOrder(newOrder: Order): Promise<Order> {
    return this.http.post(this.ordersUrl, newOrder)
               .toPromise()
               .then(response => response.json() as Order)
               .catch(this.handleError);
  }

  // get("/api/orders/:id") endpoint not used by the app

  // put("/api/orders/:id")
  updateOrder(putOrder: Order): Promise<Order> {
    var putUrl = this.ordersUrl + '/' + putOrder._id;
    return this.http.put(putUrl, putOrder)
               .toPromise()
               .then(response => response.json() as Order)
               .catch(this.handleError);
  }

  // delete("/api/orders/:id")
  deleteOrder(delOrderId: String): Promise<String> {
    return this.http.delete(this.ordersUrl + '/' + delOrderId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
