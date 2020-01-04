import { Component, OnInit, } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registerForm: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'Please enter your email' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],

    mobileNumber: [
      { type: 'required', message: 'Please enter your mobile number' },
      { type: 'minlength', message: 'Please enter 10 digit mobile number' },
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
      mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      terms: ['true', Validators.pattern('true')],
      // roles: this.formBuilder.array([{ name: 'user' }])
    });
  }

  onFormSubmit(form, error) {

    if (this.registerForm.invalid) {
      return;
    }
    this.apiService.addNewUser(form).subscribe(res => {
      console.log(`${this.f.fullName.value} registered successfully..`);
      this.router.navigate(['/login']);
    });
    console.log(error);
  }

  isInputNumber(event: any) {

    const ch = String.fromCharCode(event.which);

    if (!(/[0-9]/.test(ch))) {
      event.preventDefault();
    }

  }

}
