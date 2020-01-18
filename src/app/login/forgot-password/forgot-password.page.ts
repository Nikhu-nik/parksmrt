import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  resetPasswordForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }


  resetPassword(form) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.requestReset(this.f.email.value).subscribe(
        data => {
          this.resetPasswordForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
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
      this.IsvalidForm = false;
    }
  }


}
