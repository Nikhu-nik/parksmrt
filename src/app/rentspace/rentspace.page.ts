import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit {

 countryList;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('https://restcountries.eu/rest/v2/all')
    .subscribe((data) => {
      this.countryList = data;
    })
  }

}
