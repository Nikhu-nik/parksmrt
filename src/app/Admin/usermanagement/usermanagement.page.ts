import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
})
export class UsermanagementPage implements OnInit {

  users: any;

  constructor( private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    })
  }

}
