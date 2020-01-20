import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {

  updateEmailForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
  ) { }

  validation_messages = {

    email: [
      { type: 'required', message: 'Please enter your email' },
      { type: 'pattern', message: 'Please enter a valid email' },
    ],
  };

  ngOnInit() {
    this.updateEmailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    });
  }

  get f() {
    return this.updateEmailForm.controls;
  }

  updateUserDetails(form) {
    this.submitted = true;
    if (this.updateEmailForm.invalid) {
      return;
    } else {
      this.apiService.updateUser(form).subscribe(res => {
        localStorage.setItem('currentUser', this.f.email.value);
        this.router.navigate(['/main/user-details']);
      });
    }
  }


}
