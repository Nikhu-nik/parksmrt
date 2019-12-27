import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { GooglemapService } from '../service/googlemap.service';

declare var google: any;

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit {

  countryList;
  firstFormGroup: FormGroup;
  GoogleAutocomplete;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  currentNumber = 1;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              public ngZone: NgZone,
              private platform: Platform,
              private googlemapService: GooglemapService, ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }


 async ngOnInit() {
    this.httpClient.get('https://restcountries.eu/rest/v2/all')
      .subscribe((data) => {
        this.countryList = data;
      });

    this.firstFormGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
    await this.platform.ready();
    await this.googlemapService.loadMap();
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
    if (this.autocomplete.input !== '') {
      return true;
    } else {
      return false;
    }
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    this.currentNumber--;
  }
}


