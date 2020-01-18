import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {
  GoogleMap,
  Marker,
  MyLocation,
  MyLocationOptions,
} from '@ionic-native/google-maps/ngx';


@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  map: GoogleMap;

  constructor(
    public toastCtrl: ToastController,
    public locationAccuracy: LocationAccuracy, ) {
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
      const marker: Marker = this.map.addMarkerSync({
        icon: 'aqua',
        position: location.latLng,
      });
    }).catch(() => {
      this.showToast('Please Turn ON Device GPS');
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
      cssClass: 'customToast'
    });
    toast.present();
  }

  

}
