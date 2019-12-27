import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.page.html',
  styleUrls: ['./mybookings.page.scss'],
})
export class MybookingsPage implements OnInit {

  constructor(private menuController: MenuController, private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.menuController.close();
    this.router.navigate(['/home']);
  }

}
