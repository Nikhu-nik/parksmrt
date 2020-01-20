import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMobNumberPageRoutingModule } from './update-mob-number-routing.module';

import { UpdateMobNumberPage } from './update-mob-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateMobNumberPageRoutingModule
  ],
  declarations: [UpdateMobNumberPage]
})
export class UpdateMobNumberPageModule {}
