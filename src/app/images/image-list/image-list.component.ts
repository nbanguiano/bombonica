import { Component, Input, OnInit } from '@angular/core';

import { Image } from '../image';
import { ImageService } from '../image.service';
import { Order } from '../../orders/order';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  providers: [ImageService]
})
export class ImageListComponent implements OnInit {

  @Input()
  images: Image[];
  @Input()
  order: Order;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  deleteImage(imageId: String) {
    this.imageService.deleteImage(imageId)
  };

};
