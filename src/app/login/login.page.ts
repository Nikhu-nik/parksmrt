import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';


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
  ) { }

  ngOnInit() {
    this.authService.logout();
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
        if (sessionStorage.getItem('role') === 'ROLE_USER') {
          this.router.navigate(['/home']);
        } else if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        }
        console.log('Logged in successfully..');
        this.ApiService.getUserDetails()
          .subscribe((data) => {
            console.log(data);
          });
      },
        Error => {
          console.log('Error ' + Error.prototype);
        }
      );
  }

}
