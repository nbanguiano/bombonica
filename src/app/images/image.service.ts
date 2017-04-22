import { Injectable } from '@angular/core';
import { Image } from './image';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { UserService } from '../common/user.service';

@Injectable()
export class ImageService {

  constructor(private http: Http,
              private user: UserService) {}

  private imagesUrl = '/api/images';

  // get("/api/images")
  getImages(): Promise<Image[]>{
    return this.http.get(this.user.signUri(this.imagesUrl))
               .toPromise()
               .then(response => response.json() as Image[])
               .catch(this.handleError);
  }

  // post("/api/images")
  createImage(newImage: any): Promise<any> {
    console.log(newImage);
    return this.http.post(this.user.signUri(this.imagesUrl), newImage)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  // get("/api/images/:id") endpoint not used by the app

  // put("/api/images/:id")
  updateImage(putImage: Image): Promise<Image> {
    var putUrl = this.user.signUri(this.imagesUrl + '/' + putImage._id);
    return this.http.put(putUrl, putImage)
               .toPromise()
               .then(response => response.json() as Image)
               .catch(this.handleError);
  }

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
