import { Injectable } from '@angular/core';
import { Image } from './image';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/toPromise';

import { UserService } from '../common/user.service';

@Injectable()
export class ImageService {

  constructor(private http: Http,
              private user: UserService) {}

  private imagesUrl = '/api/images';

  private _subject: BehaviorSubject<Image[]> = new BehaviorSubject([]);

  updateImages(images: Image[]) {
    this._subject.next(images);
  }

  clearMemory() {
    this._subject.next(null);
  }

  getImageUpdate(): Observable<any> {
    return this._subject.asObservable();
  }

  // get("/api/images")
  getImages(): Promise<Image[]>{
    return this.http.get(this.user.signUri(this.imagesUrl))
               .toPromise()
               .then(response => response.json() as Image[])
               .catch(this.handleError);
  }

  // post("/api/images") <- This is handled specially in image-input.component.ts in ImageInputComponent.upload()

  // get("/api/images/byOrder/:orderId")
  getImagesByOrder(orderId: String): Promise<Image[]>{
    return this.http.get(this.user.signUri(this.imagesUrl + '/byOrder/' + orderId))
               .toPromise()
               .then(response => response.json() as Image[])
               .catch(this.handleError);
  }

  // put("/api/images/:id") <- No use-case to update images like this

  // delete("/api/images/:id")
  deleteImage(delImageId: String): Promise<String> {
    return this.http.delete(this.user.signUri(this.imagesUrl + '/' + delImageId))
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
