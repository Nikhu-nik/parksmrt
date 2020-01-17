import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsPermitsPage } from './tickets-permits.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsPermitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsPermitsPageRoutingModule {}
