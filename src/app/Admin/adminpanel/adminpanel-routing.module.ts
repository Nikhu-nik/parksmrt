import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminpanelPage } from './adminpanel.page';

const routes: Routes = [
  {
    path: '',
    component: AdminpanelPage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule) },
      { path: 'usermanagement', loadChildren: () => import('../usermanagement/usermanagement.module').then(m => m.UsermanagementPageModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminpanelPageRoutingModule { }
