import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rentspacedetails',
  templateUrl: './rentspacedetails.page.html',
  styleUrls: ['./rentspacedetails.page.scss'],
})
export class RentspacedetailsPage implements OnInit {

  currentNumber = 1;

  constructor() { }

  ngOnInit() {
  }
  increment() {
    this.currentNumber++;
  }

  decrement() {
    this.currentNumber--;
  }

}
