import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { AdminApiService } from 'src/app/service/admin-api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
})
export class UsermanagementPage implements OnInit {

  users: UserModel[];
  searchText;

  constructor(private adminApiService: AdminApiService, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminApiService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }



  deleteUser(id) {
    this.deleteAlert(id);
  }

  async deleteAlert(id) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Confirm',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (res) => {

          }
        },
        {
          text: 'Ok',
          cssClass: 'buttonCss',
          handler: () => {
            this.adminApiService.deleteUser(id).subscribe(data => {
              this.getAllUsers();
            });
          }
        }
      ]
    });

    await alert.present();
  }


}
