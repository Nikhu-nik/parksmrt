import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  async showToast(message: string, position) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      mode: 'ios',
      cssClass: 'customToast'
    });
    toast.present();
  }

}
