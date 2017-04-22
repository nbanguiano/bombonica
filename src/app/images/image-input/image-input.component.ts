import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UserService } from '../../common/user.service';

@Component({
    selector: 'image-input',
    templateUrl: './image-input.component.html',
    styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit, OnChanges {
  @Input()
  orderId: String;

  constructor(private user: UserService) {}

  // Our image upload enpoint
  private imageUploadUrl = '/api/images';

  // A new instance of the ng2 file uploader
  uploader:FileUploader = new FileUploader({url: this.user.signUri(this.imageUploadUrl), itemAlias: 'portfolio'});

  upload(orderId: String){
    // Enrich request with the  orderId related to this image
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('orderId', orderId);
    };
    // Do the actual upload. This is posting the request to the imageUploadUrl
    this.uploader.uploadAll();
  }

  ngOnChanges() {
    // Clear queue
    this.uploader.clearQueue();
  }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
}
