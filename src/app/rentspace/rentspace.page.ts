import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImagePickerService } from '../service/image-picker.service';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit {

  image;
  countryList;
  firstFormGroup: FormGroup;
  currentNumber = 1;
  imageData: any;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private imagePickerService: ImagePickerService,
  ) { }


  ngOnInit() {
    this.httpClient.get<any>('https://restcountries.eu/rest/v2/all')
      .subscribe((res) => {
        this.countryList = res;
      });

    this.firstFormGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber <= 1) {
      return;
    } else {
      this.currentNumber--;
    }
  }

  // selectImage() {
  //   this.imagePickerService.selectImage().then(data => {
  //     this.images = data ;
  //   });
  // }

  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'Select Image source',
      buttons: [{
        text: 'Camera',
        handler: () => {
          this.openCamera();
        }
      },
      {
        text: 'Load from Gallery',
        handler: () => {
          //  this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.image = (<any> window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      // Handle error
      alert('error ' + JSON.stringify(err))
    });
  }

  upload() {
    const url = 'http://localhost:3000/api/upload/image';
    const date = new Date().valueOf();

    // Replace extension according to your media type
    const imageName = date + '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(this.imageData);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

    const postData = new FormData();
    postData.append('file', imageFile);

    const data: Observable<any> = this.httpClient.post(url, postData);
    data.subscribe((result) => {
      console.log(result);
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }


}


