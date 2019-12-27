import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocodesPageRoutingModule } from './promocodes-routing.module';

import { PromocodesPage } from './promocodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PromocodesPageRoutingModule
  ],
  declarations: [PromocodesPage]
})
export class PromocodesPageModule {}
