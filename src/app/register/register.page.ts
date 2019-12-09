import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      roles: this.formBuilder.array([{ name: 'user' }])
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onFormSubmit(form: NgForm) {

    if (this.registerForm.invalid) {
      return;
    }
    this.apiService.addNewUser(form).subscribe(res => {
      console.log(`${this.f.fullName.value} registered successfully..`);
      this.router.navigate(['/login']);
    });
  }

  isInputNumber(event: any) {

    const ch = String.fromCharCode(event.which);

    if (!(/[0-9]/.test(ch))) {
      event.preventDefault();
    }

  }

}
