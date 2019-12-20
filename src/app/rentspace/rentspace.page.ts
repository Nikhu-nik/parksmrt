import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit {

  countryList;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  GoogleAutocomplete;
  autocomplete: { input: string; };
  autocompleteItems: any[];

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public ngZone: NgZone) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.httpClient.get('https://restcountries.eu/rest/v2/all')
      .subscribe((data) => {
        this.countryList = data;
      });

    this.firstFormGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  clearAutocomplete() {
    if (this.autocomplete.input !== '' ) {
      return true;
    } else {
      return false;
    }
  }

}


