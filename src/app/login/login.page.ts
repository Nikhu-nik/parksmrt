import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { ToastService } from '../service/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  submitted = false;
  loginError = false;
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
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        (res) => {
            console.log('Login Successfull');
            localStorage.setItem('token', res.body.token);
            this.loading.present();
            this.router.navigate(['/main']);
            this.loading.dismiss();
        },
        (error) => {
          if(error.status==401){
            console.log('wrong email')
          }else{
            console.log('wrong password');
          }
          
          
        }
        // if (localStorage.getItem('role') === 'ROLE_USER') {
        //   this.router.navigate(['/main/home']);
        // } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        //   this.router.navigate(['/admin']);
        // }
      );
  }


  // login() {
  //   if (this.f.email.value === 'user' && this.f.password.value === 'password') {
  //     this.loading.present();
  //     this.router.navigate(['/main']);
  //     this.loading.dismiss();
  //   } else if (this.loginForm.controls.email.value === '' || this.loginForm.controls.password.value === '') {
  //     alert('Enter all required fields');
  //   } else {
  //     alert('Invalid email or password');
  //   }
  // }

}
