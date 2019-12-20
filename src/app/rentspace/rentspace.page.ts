import { Component, AfterViewInit, OnInit, ElementRef, ViewChild, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-rentspace',
  templateUrl: './rentspace.page.html',
  styleUrls: ['./rentspace.page.scss'],
})
export class RentspacePage implements OnInit, AfterViewInit {

  latitude: any;
  longitude: any;
  countryList;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  GoogleAutocomplete;
  autocomplete: { input: string; };
  autocompleteItems: any[];

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public ngZone: NgZone,private geolocation: Geolocation,) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  @ViewChild('mapElement', { static: false }) mapNativeElement: ElementRef;

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


