import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { UserDetailsPage } from '../user-details/user-details.page';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.page.html',
  styleUrls: ['./update-name.page.scss'],
})
export class UpdateNamePage implements OnInit {

  updateNameForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.updateNameForm = this.formBuilder.group({
      fullName: ['', Validators.required],
    });
  }

  get f() {
    return this.updateNameForm.controls;
  }

  updateUserDetails(form) {
    this.submitted = true;
    if (this.updateNameForm.invalid) {
      return;
    } else {
      this.apiService.updateUser(form).subscribe(res => {
        this.router.navigate(['/main/user-details']);
        this.updateNameForm.reset();
      });
    }
  }

}
