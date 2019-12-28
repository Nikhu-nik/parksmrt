import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentspacePageRoutingModule } from './rentspace-routing.module';

import { RentspacePage } from './rentspace.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RentspacePageRoutingModule
  ],
  declarations: [RentspacePage],
})
export class RentspacePageModule {}
