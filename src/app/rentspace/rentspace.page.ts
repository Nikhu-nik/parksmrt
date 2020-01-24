import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from 'src/environments/environment';

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
  base64Image: string;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private alertCtrl: AlertController,
              private loading: LoadingController,
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
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Load from Gallery',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
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


  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.upload(this.base64Image);
    }, (err) => {
      alert('error' + JSON.stringify(err));
    });
  }


  async upload(file) {

    const formdata = new FormData();
    formdata.append('imageFile', file);

    const loader = await this.loading.create({
      message: 'Processing please wait…',
    });

    loader.present().then(() => {
      this.httpClient.post(environment.baseURL.url + '/upload/image', formdata, {responseType: 'text' })
        .subscribe(async res => {
          loader.dismiss();
          if (res === 'OK') {
            const alert = await this.alertCtrl.create({
              message: 'Image uploaded successfully',
            });
            alert.present();
            setTimeout(() => {
              alert.dismiss();
            }, 1500);
          } else {
            const alert = await this.alertCtrl.create({
              message: 'Image could not be uploaded',
              buttons: [
                {
                  text: 'Ok',
                  role: 'cancel',
                },
              ]
            });
            alert.present();
          }
        });
    });
  }


}


