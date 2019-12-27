import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  MyLocation,
  Environment,
  MyLocationOptions,
  GoogleMapControlOptions,
} from '@ionic-native/google-maps/ngx';


@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  map: GoogleMap;

  constructor(
    public toastCtrl: ToastController,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy) {
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCgfwBLFmFo-1p0KhTakTZbisHSDI9JMn8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCgfwBLFmFo-1p0KhTakTZbisHSDI9JMn8'
    });
    const mapOptions: GoogleMapControlOptions = {
      compass: false,
      myLocationButton: false,
      myLocation: false,
      indoorPicker: false,
      zoom: false,
      mapToolbar: false
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.checkGPSPermission();
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
        zoom: 15,
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

  getCurrentLocation() {
    const option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    // Get the location of you
    this.map.getMyLocation(option).then((location: MyLocation) => {
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        bearing: 0,
        duration: 1000
      });
      // add a marker
      const marker: Marker = this.map.addMarkerSync({
        icon: 'aqua',
        position: location.latLng,
      });
      // show the infoWindow
      marker.showInfoWindow();
    }).catch(() => {
      this.showToast('Please Turn ON Device GPS');
    });
  }

  // Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.goToMyLocation();
      },
    );
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


}
