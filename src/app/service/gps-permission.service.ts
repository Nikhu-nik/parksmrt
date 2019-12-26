import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
   providedIn: 'root'
})
export class GpsPermissionService {

   locationCoords: any;

   constructor(
      private toastCtrl: ToastController,
      private androidPermissions: AndroidPermissions,
      private locationAccuracy: LocationAccuracy
   ) { }

  //Check if application having GPS access permission  
  checkGPSPermission() {
   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
     result => {
       if (result.hasPermission) {

         //If having permission show 'Turn On GPS' dialogue
         this.askToTurnOnGPS();
       } else {

         //If not having permission ask for permission
         this.requestGPSPermission();
       }
     },
     err => {
       this.showToast(err);
     }
   );
 }

 requestGPSPermission() {
   this.locationAccuracy.canRequest().then((canRequest: boolean) => {
     if (canRequest) {
       console.log("4");
     } else {
       //Show 'GPS Permission Request' dialogue
       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
         .then(
           () => {
             // call method to turn on GPS
             this.askToTurnOnGPS();
           },
           error => {
             //Show alert if user click on 'No Thanks'
             alert('requestPermission Error requesting location permissions ' + error)
           }
         );
     }
   });
 }

 askToTurnOnGPS() {
   this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
     () => {
     },
     error => alert('Error requesting location permissions ' + JSON.stringify(error))
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
