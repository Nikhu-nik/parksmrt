import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.page.html',
  styleUrls: ['./msg.page.scss'],
})
export class MsgPage implements OnInit {

  email = 'abc@gmail.com';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUserDetails()
      .subscribe((data: any) => {
        this.email = data.email;
      });
  }

}
