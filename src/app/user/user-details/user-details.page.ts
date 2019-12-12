import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  userImg = '../../assets/images/user-avatar.svg';
  data: any = {};
  fullName = 'Abdur Razack';
  mobileNumber = '';
  email = '';
  password = '';

 constructor(private router: Router, private alertController: AlertController,
             private apiService: ApiService, private authService: AuthService) { }

 ngOnInit() {
   this.apiService.getUserDetails()
   .subscribe(data => {
     this.data = data.body;
     this.fullName = data.body.fullName;
     this.mobileNumber = data.body.mobileNumber;
     this.email = data.body.email;
     this.password = data.body.password;
   });

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
            this.router.navigate(['/login']);
            console.log('Logout Successful.');
         }
       }
     ]
   });

   await alert.present();
 }


}
