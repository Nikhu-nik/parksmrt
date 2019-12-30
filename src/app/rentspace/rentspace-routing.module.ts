import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentspacePage } from './rentspace.page';

const routes: Routes = [
  {
    path: '',
    component: RentspacePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentspacePageRoutingModule {}
