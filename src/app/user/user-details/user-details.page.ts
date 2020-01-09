import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  data: any = {};
  fullName = 'Username';
  mobileNumber = '';
  email = '';
  password = '';



  // image picker variables
  imageResponse: any;
  options: any;

  constructor(private router: Router, private alertController: AlertController,
              private apiService: ApiService, private authService: AuthService,
              private imagePicker: ImagePicker) { }

  ngOnInit() {
    //  this.apiService.getUserDetails()
    //  .subscribe(data => {
    //    this.data = data.body;
    //    this.fullName = data.body.fullName;
    //    this.mobileNumber = data.body.mobileNumber;
    //    this.email = data.body.email;
    //    this.password = data.body.password;
    //  });

  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (res) => {

          }
        },
        {
          text: 'OK',
          cssClass: 'buttonCss',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/landing-page']);
            console.log('Logout Successful.');
          }
        }
      ]
    });

    await alert.present();
  }


  getImages() {

    this.options = {
      maximumImagesCount: 1,
      width: 200,
      // height: 200,
      quality: 100,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }


}
