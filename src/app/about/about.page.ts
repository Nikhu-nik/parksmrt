import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  version = [];
  
  constructor(public httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('../assets/appversion.json').subscribe((data) => {
      this.version = data as [] ;
    }, (err: HttpErrorResponse) => {
      console.log (err.message);
    });
  }

}
