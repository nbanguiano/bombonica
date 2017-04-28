import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Image } from '../image';
import { ImageService } from '../image.service';
import { Order } from '../../orders/order';

import { ImageInputComponent } from '../image-input/image-input.component';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnDestroy {

  @Input()
  order: Order;

  @Input()
  images: Image[];

  imgSubscription: Subscription;

  constructor(private imageService: ImageService) {
                this.imgSubscription = this.imageService.getImageUpdate().subscribe((images: Image[]) => {
                  this.images = images;
                });
              }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.imgSubscription.unsubscribe();
  }

  deleteImage(imageId: String) {
    this.imageService.deleteImage(imageId)
        .then((res) => { 
          this.updateImageView(this.order._id);
        });
  }

  updateImageView(orderId: String) {
    // send message to subscribers via observable subject
    this.imageService.getImagesByOrder(orderId)
                     .then((images: Image[]) => {
                        this.images = images;
                     })
  }

};
