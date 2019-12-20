import { Component, AfterViewInit, OnInit, ElementRef, ViewChild, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  data: any = {};
  fullName = 'Username';
  userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCEzGoZ6NCvbjg4hJlLL_0TLB61J8R2Xi09hoiSpGxXvVdTRoB';
  latitude: any;
  longitude: any;

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

  // view child for gmap
  @ViewChild('mapElement', { static: false }) mapNativeElement: ElementRef;

  placeId: string;
  backButtonSubscription: any;

  constructor(private router: Router, private authService: AuthService,
              private apiService: ApiService,
              private geolocation: Geolocation,
              public loadingController: LoadingController,
              private platform: Platform,
              public ngZone: NgZone) {
                this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
                this.autocomplete = { input: '' };
                this.autocompleteItems = [];
                this.geocoder = new google.maps.Geocoder;
                this.markers = [];
              }

  ngOnInit() {
    this.apiService.getUserDetails()
      .subscribe(data => {
        this.data = data.body;
        this.fullName = data.body.fullName;
      });

  }

  // geoloaction integration
  ngAfterViewInit(): void {
    const options = {
      timeout: 25000,
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: { lat: 12.979316, lng: 77.599773 },
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      });


      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      map.setCenter(pos);
      const icon = {
        url: '../assets/images/marker1.svg', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        optimized: false,
        icon: icon,
        animation: google.maps.Animation.DROP,
      });


      const infoWindow = new google.maps.InfoWindow;
      infoWindow.setPosition(pos);
      map.setCenter(pos);
      // marker.addListener('click', function () {
      //   infoWindow.open(map, marker);
      // });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
  // session logout
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    console.log('Logout Successful.');
  }

  // getting current location button
  getLocation() {
    const options = {
      timeout: 25000,
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: { lat: 12.979316, lng: 77.599773 },
        zoom: 16,
        disableDefaultUI: true,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      map.setCenter(pos);
      const icon = {
        url: '../assets/images/marker1.svg', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        optimized: false,
        icon: icon
      });

      const infoWindow = new google.maps.InfoWindow;
      infoWindow.setPosition(pos);
      map.setCenter(pos);
      // marker.addListener('click', function () {
      //   infoWindow.open(map, marker);
      // });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

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
          key: 'AIzaSyDAyJn303EseL6pOyLY5cxKr8WvGop_Nso'
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
    .subscribe(() => {
       navigator['app'].exitApp();
      });
   }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
   }

   
   clearAutocomplete() {
    if (this.autocomplete.input !== '' ) {
      return true;
    } else {
      return false;
    }
  }


  // GoTo(){
  //   return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeId;
  // }

}


