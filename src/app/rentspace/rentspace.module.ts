import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentspacePageRoutingModule } from './rentspace-routing.module';

import { RentspacePage } from './rentspace.page';
// import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // MatStepperModule,
    RentspacePageRoutingModule
  ],
  declarations: [RentspacePage]
})
export class RentspacePageModule {}
