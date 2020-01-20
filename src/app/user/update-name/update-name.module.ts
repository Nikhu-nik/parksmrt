import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNamePageRoutingModule } from './update-name-routing.module';

import { UpdateNamePage } from './update-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateNamePageRoutingModule
  ],
  declarations: [UpdateNamePage]
})
export class UpdateNamePageModule {}
