import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocodesPageRoutingModule } from './promocodes-routing.module';

import { PromocodesPage } from './promocodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromocodesPageRoutingModule
  ],
  declarations: [PromocodesPage]
})
export class PromocodesPageModule {}
