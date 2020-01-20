import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-mob-number',
  templateUrl: './update-mob-number.page.html',
  styleUrls: ['./update-mob-number.page.scss'],
})
export class UpdateMobNumberPage implements OnInit {
  updateMobNumberForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
  ) { }


  validation_messages = {

    mobileNumber: [
      { type: 'required', message: 'Please enter your mobile number' },
      { type: 'minlength', message: 'Please enter 10 digit mobile number' },
      { type: 'maxlength', message: 'Please enter only 10 digit mobile number' },
    ],
  };

  ngOnInit() {
    this.updateMobNumberForm = this.formBuilder.group({
      mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    });
  }

  get f() {
    return this.updateMobNumberForm.controls;
  }

  updateUserDetails(form) {
    this.submitted = true;
    if (this.updateMobNumberForm.invalid) {
      return;
    } else {
      this.apiService.updateUser(form).subscribe(res => {
        this.router.navigate(['/main/user-details']);
        this.updateMobNumberForm.reset();
      });
    }
  }


}
