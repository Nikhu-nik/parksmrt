import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment,
  MyLocationOptions,
  GoogleMapControlOptions,
} from '@ionic-native/google-maps/ngx';
import { GpsPermissionService } from './gps-permission.service';


@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  map: GoogleMap;

  constructor( public toastCtrl: ToastController,private gpsPermissionService: GpsPermissionService ) {
   }

   loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCgfwBLFmFo-1p0KhTakTZbisHSDI9JMn8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCgfwBLFmFo-1p0KhTakTZbisHSDI9JMn8'
    });
    const mapOptions: GoogleMapControlOptions = {
      compass: false,
      myLocationButton: false,
      myLocation: true,
      indoorPicker: false,
      zoom: false,
      mapToolbar: false
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.goToMyLocation();
  }

  goToMyLocation() {
    this.gpsPermissionService.checkGPSPermission();
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
    })
  }
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  getCurrentLocation() {
    const option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    this.map.clear();
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
        animation: GoogleMapsAnimation.BOUNCE
      });
      // show the infoWindow
      marker.showInfoWindow();
    }).catch(() => {
      // this.loading.dismiss();
      this.showToast('Please turn On device Gps');
    });
  }


}
