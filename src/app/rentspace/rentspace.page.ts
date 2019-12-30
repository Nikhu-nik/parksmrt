import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit{

  countryList;
  firstFormGroup: FormGroup;
  locationImage = '';
  currentNumber = 1;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
  ) {}


   ngOnInit() {
    this.httpClient.get('https://restcountries.eu/rest/v2/all')
      .subscribe((data) => {
        this.countryList = data;
      });

    this.firstFormGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    this.currentNumber--;
  }

}


