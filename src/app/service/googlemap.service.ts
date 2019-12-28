import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  MyLocation,
  MyLocationOptions,
  GoogleMapControlOptions,
} from '@ionic-native/google-maps/ngx';


@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  map: GoogleMap;

  constructor(
    public toastCtrl: ToastController, ) {
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

  getCurrentLocation() {
    const option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    // Get the location of you
    this.map.getMyLocation(option).then((location: MyLocation) => {
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 15,
        bearing: 0,
        duration: 1000
      });
    }).catch(() => {
      this.showToast('Please Turn ON Device GPS');
    });
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
