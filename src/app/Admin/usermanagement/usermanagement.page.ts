import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
})
export class UsermanagementPage implements OnInit {

  users = [];

  constructor( private apiService: ApiService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(users) {
   return this.httpClient.delete(environment.baseURL + '/deleteUser/' + users._id)
   .subscribe(res => {
     console.log('user deleted');
   });
  }

}
