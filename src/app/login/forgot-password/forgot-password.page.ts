import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }


  resetPassword() {
    // if (!this.resetPasswordForm.valid){
    //   console.log(this.resetPasswordForm.value);
    // } else {
    //   this.authProvider.resetPassword(this.resetPasswordForm.value.email)
    //   .then(async (user) => {
    //     const alert = await this.alertCtrl.create({
    //       message: 'We just sent you a reset link to your email',
    //       buttons: [
    //         {
    //           text: 'Ok',
    //           role: 'cancel',
    //           handler: () => { this.navCtrl.pop(); }
    //         }
    //       ]
    //     });
    //     alert.present();

    //   }, async (error) => {
    //     const errorMessage: string = error.message;
    //     const errorAlert = await this.alertCtrl.create({
    //       message: errorMessage,
    //       buttons: [{ text: 'Ok', role: 'cancel' }]
    //     });
    //     errorAlert.present();
    //   });
    // }
  }

}
