import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-permits',
  templateUrl: './tickets-permits.page.html',
  styleUrls: ['./tickets-permits.page.scss'],
})
export class TicketsPermitsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/main']);
  }

}
