import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNamePage } from './update-name.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNamePageRoutingModule {}
