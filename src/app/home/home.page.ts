import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { Platform, AlertController } from '@ionic/angular';
import { GooglemapService } from '../service/googlemap.service';


declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: any = {};
  fullName = 'Username';
  userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCEzGoZ6NCvbjg4hJlLL_0TLB61J8R2Xi09hoiSpGxXvVdTRoB';
  // current date object
  myDate = new Date().toISOString();

  // gmap autocomplete variables
  GoogleAutocomplete;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  markers: any[];
  geocoder;
  nearbyItems: any[];
  GooglePlaces: any;
  placeId: string;
  backButtonSubscription: any;

  constructor(private router: Router, private authService: AuthService,
              private apiService: ApiService,
              private platform: Platform,
              private googlemapService: GooglemapService,
              private alertCtrl: AlertController,
              public ngZone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

  }

  async ngOnInit() {
    this.apiService.getUserDetails()
      .subscribe(data => {
        this.data = data.body;
        this.fullName = data.body.fullName;
      });
    await this.platform.ready();
    await this.googlemapService.loadMap();
  }

  getCurrentLocation() {
    this.googlemapService.getCurrentLocation();
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
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {

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
  }

  // Back button exit app
  ionViewDidEnter() {
    this.backButtonSubscription = this.platform.backButton
      .subscribe(async () => {
        if (this.router.isActive('/menu/home', true) && this.router.url === '/menu/home') {
          this.confirmExit();
        }
      });
  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  async confirmExit() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Exit',
      message: 'Are you sure you want to exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }

  clearAutocomplete() {
    if (this.autocomplete.input !== '') {
      return true;
    } else {
      return false;
    }
  }

}


