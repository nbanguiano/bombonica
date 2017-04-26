import { Component, Input } from '@angular/core';

import { Image } from '../image';
import { ImageService } from '../image.service';
import { Order } from '../../orders/order';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {

  @Input()
  order: Order;

  @Input()
  images: Image[];

  constructor(private imageService: ImageService) {}

  deleteImage(imageId: String) {
    this.imageService.deleteImage(imageId)
        .then((res) => { 
          this.updateImageView();
        });
  };

  updateImageView(): void {
    // send message to subscribers via observable subject
    this.imageService.getImagesByOrder(this.order._id)
                     .then((images: Image[]) => {
                        this.imageService.updateImages(images);
                     })
  }
 
  clearMemory(): void {
    // clear message
    this.imageService.clearMemory();
  }

};
