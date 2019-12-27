import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  MyLocation,
  MyLocationOptions,
  GoogleMapControlOptions,
} from '@ionic-native/google-maps/ngx';

declare var google: any;

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit {

  map: GoogleMap;
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
  ) {
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
    await this.loadMap();
  }

  loadMap() {
    const mapOptions: GoogleMapControlOptions = {
      compass: false,
      myLocationButton: false,
      myLocation: false,
      indoorPicker: false,
      zoom: false,
      mapToolbar: false
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.goToMyLocation();
  }

  goToMyLocation() {
    const option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    this.map.clear();
    // Get the location of you
    this.map.getMyLocation(option).then((location: MyLocation) => {
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 13,
        bearing: 0,
        duration: 1000
      });

      // add a marker
      const marker: Marker = this.map.addMarkerSync({
        icon: 'aqua',
        position: location.latLng,
        animation: 'DROP'
      });
      // show the infoWindow
      marker.showInfoWindow();
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


