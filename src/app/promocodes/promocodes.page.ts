import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-promocodes',
  templateUrl: './promocodes.page.html',
  styleUrls: ['./promocodes.page.scss'],
})
export class PromocodesPage implements OnInit {

  clear: string;
  scannedData: {};

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) {

  }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert('Barcode data ' + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  goHome() {
    this.clear = '';
    this.router.navigate(['/home']);
  }

}
