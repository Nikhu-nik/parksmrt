import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

public fb: boolean = true;
public mail: boolean = true;
public whatsapp: boolean = true;

  fullName = 'Username';
  email = 'abc@gmail.com';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUserDetails()
    .subscribe(data => {
      this.fullName = data.body.fullName;
      this.email = data.body.email;
    });
  }
 
  mail1(){
    if(name === 'mail'){
      return true
    }else{
      return false;
    }
  }
}
