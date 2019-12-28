import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentspacedetailsPageRoutingModule } from './rentspacedetails-routing.module';

import { RentspacedetailsPage } from './rentspacedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentspacedetailsPageRoutingModule
  ],
  declarations: [RentspacedetailsPage]
})
export class RentspacedetailsPageModule {}
