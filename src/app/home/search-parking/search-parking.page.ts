import { Component, OnInit, NgZone } from '@angular/core';


declare var google: any;

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.page.html',
  styleUrls: ['./search-parking.page.scss'],
})
export class SearchParkingPage implements OnInit {

  // gmap autocomplete variables
  GoogleAutocomplete;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  markers: any[];
  geocoder;
  nearbyItems: any[];
  GooglePlaces: any;
  placeId: string;



  constructor(public ngZone: NgZone) {

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

  }

  ngOnInit() {
  }

  // gmap autocomplete search
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

  selectSearchResult(item) {
    this.autocompleteItems = [];
    console.log(item);
    /*this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {

        console.log( results[0].geometry.location);
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          types: ['parking'],
          key: 'AIzaSyCgfwBLFmFo-1p0KhTakTZbisHSDI9JMn8'
        }, (near_places) => {
          this.ngZone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
          });
        });


      }
    });
    */

    //13.034968, 77.604024

    //create parking locations in DB
    //
  }

  clearAutocomplete() {
    if (this.autocomplete.input !== '') {
      return true;
    } else {
      return false;
    }
  }
}
