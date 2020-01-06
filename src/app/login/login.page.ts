import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { ToastService } from '../service/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              public loading: LoadingService,
              public toastService: ToastService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        (res) => {
          this.toastService.showToast('Login Successfull');
          console.log('Login Successfull');
          localStorage.setItem('token', res.body.token);
          this.router.navigate(['/main']);
        },
        (error) => {
          this.toastService.showToast('Enter valid credentials');
          console.log(error);
        }
        // if (localStorage.getItem('role') === 'ROLE_USER') {
        //   this.router.navigate(['/main/home']);
        // } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        //   this.router.navigate(['/admin']);
        // }
      );
  }


  // onSubmit(error) {
  //   if (this.f.username.value === 'user' && this.f.password.value === 'password'){
  //     this.loading.present();
  //     this.router.navigate(['/main/home']);
  //     this.loading.dismiss();
  //   } else {
  //     alert(error);
  //   }
  // }

}
