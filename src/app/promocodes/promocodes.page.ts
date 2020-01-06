import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-promocodes',
  templateUrl: './promocodes.page.html',
  styleUrls: ['./promocodes.page.scss'],
})
export class PromocodesPage implements OnInit {

  qrCodeForm: FormGroup;
  scannedData;

  constructor(private router: Router, private barcodeScanner: BarcodeScanner, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.qrCodeForm = this.formBuilder.group({
      promoCode: ['', Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {

  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.scannedData = barcodeData.text;
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  goHome() {
    this.qrCodeForm.reset();
    this.router.navigate(['/main']);
  }

}
