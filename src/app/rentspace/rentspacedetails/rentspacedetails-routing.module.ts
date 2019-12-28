import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentspacedetailsPage } from './rentspacedetails.page';

const routes: Routes = [
  {
    path: '',
    component: RentspacedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentspacedetailsPageRoutingModule {}
