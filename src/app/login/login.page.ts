import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { LoadingService } from '../service/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              private ApiService: ApiService,
              public loading: LoadingService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe((loginData) => {
        // if (localStorage.getItem('role') === 'ROLE_USER') {
        //   this.router.navigate(['/main/home']);
        // } else if (localStorage.getItem('role') === 'ROLE_ADMIN') {
        //   this.router.navigate(['/admin']);
        // }
        this.router.navigate(['/main']);
        
        console.log('Logged in successfully..');
        // this.ApiService.getUserDetails()
        //   .subscribe((data) => {
        //     console.log(data);
        //   });
      },
        Error => {
          console.log('Error ' + Error.prototype);
        }
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
