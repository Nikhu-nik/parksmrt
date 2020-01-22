import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertController: AlertController) { }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registerForm: FormGroup;
  submitted = false;

  validation_messages = {

    fullName: [
      { type: 'required', message: 'Please enter your full name' },
      { type: 'pattern', message: 'Name should not contain special character ' },
    ],

    email: [
      { type: 'required', message: 'Please enter your email' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],

    mobileNumber: [
      { type: 'required', message: 'Please enter your mobile number' },
      { type: 'minlength', message: 'Please enter 10 digit mobile number' },
      { type: 'maxlength', message: 'Please enter only 10 digit mobile number' },
    ],

    password: [
      { type: 'required', message: 'Please enter your password' },
      { type: 'minlength', message: 'Password must be 8 characters long' },
    ],

    terms: [
      { type: 'pattern', message: 'Please accept terms and condtions' },
    ],

  };

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      terms: ['true', Validators.pattern('true')],
      roles: this.formBuilder.array([{ name: 'user' }])
    });
  }

  register(form) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.apiService.addNewUser(form).subscribe(
      (res) => {
        console.log(res);
        this.showAlert('Registered Successfully...');
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status == 400) {
          this.showAlert('This email has already been registered');
        }
        console.log(error);
      }
    );
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      mode: 'ios',
      message: message,
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }


  isInputNumber(event: any) {
    const ch = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(ch))) {
      event.preventDefault();
    }
  }

}
