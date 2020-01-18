import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.CurrentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      console.log(this.resetToken);
      this.VerifyToken();
    });
  }

  setPasswordForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  submitted = false;

  validation_messages = {

    password: [
      { type: 'required', message: 'Please enter your password' },
      { type: 'minlength', message: 'Password must be 8 characters long' },
    ],

  };


  ngOnInit() {

    this.Init();
  }

  VerifyToken() {
    this.authService.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.setPasswordForm = this.formBuilder.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
      }
    );
  }


  setPassword(form) {
    this.submitted = true;
    console.log(form.get('confirmPassword'));
    if (form.valid) {
      this.IsResetFormValid = true;
      this.authService.newPassword(this.setPasswordForm.controls.newPassword.value).subscribe(
        data => {
          this.setPasswordForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/login']);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsResetFormValid = false;
    }
  }

}
