import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsPermitsPageRoutingModule } from './tickets-permits-routing.module';

import { TicketsPermitsPage } from './tickets-permits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsPermitsPageRoutingModule
  ],
  declarations: [TicketsPermitsPage]
})
export class TicketsPermitsPageModule {}
