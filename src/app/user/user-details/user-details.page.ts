import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  fullName = 'Username';
  mobileNumber = '';
  email = '';



  // image picker variables
  imageResponse: any;
  options: any;

  constructor(private router: Router, private alertController: AlertController,
              private apiService: ApiService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private imagePicker: ImagePicker) {

    this.activatedRoute.params.subscribe(() => {
      this.getUserDetails();
    });

  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.apiService.getUserDetails()
      .subscribe((data: any) => {
        this.fullName = data.fullName;
        this.email = data.email;
        this.mobileNumber = data.mobileNumber;
      });
  }

  async logout() {
    const alert = await this.alertController.create({
      mode: 'ios',
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
