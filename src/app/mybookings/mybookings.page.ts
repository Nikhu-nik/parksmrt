import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.page.html',
  styleUrls: ['./mybookings.page.scss'],
})
export class MybookingsPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/main']);
  }

}
