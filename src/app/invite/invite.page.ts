import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  fullName = 'Username';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUserDetails()
      .subscribe((data: any) => {
        this.fullName = data.fullName;
      });
  }



}
