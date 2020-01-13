import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {

  fullName = 'Jhon';

  
  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  closeMenu(){
    this.menuController.close();
  }
}
