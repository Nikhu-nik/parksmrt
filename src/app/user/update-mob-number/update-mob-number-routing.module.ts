import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMobNumberPage } from './update-mob-number.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMobNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMobNumberPageRoutingModule {}
