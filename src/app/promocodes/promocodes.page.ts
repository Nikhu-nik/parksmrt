import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-promocodes',
  templateUrl: './promocodes.page.html',
  styleUrls: ['./promocodes.page.scss'],
})
export class PromocodesPage implements OnInit {

  clearInput: string;
  scannedData: {};

  constructor (private router: Router, private barcodeScanner: BarcodeScanner ) {

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
    this.clearInput = '';
    this.router.navigate(['/home']);
  }

}
