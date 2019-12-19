import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromocodesPage } from './promocodes.page';

const routes: Routes = [
  {
    path: '',
    component: PromocodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromocodesPageRoutingModule {}
