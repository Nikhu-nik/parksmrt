import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'mybookings',
        children: [
          {
            path: '',
            loadChildren: () => import('../mybookings/mybookings.module').then( m => m.MybookingsPageModule)
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
          }
        ]
      },
      {
        path: 'user-details',
        children: [
          {
            path: '',
            loadChildren: () => import('../user/user-details/user-details.module').then( m => m.UserDetailsPageModule)
          }
        ]
      },
      {
        path: 'rentspace',
        children: [
          {
            path: '',
            loadChildren: () => import('../rentspace/rentspace.module').then( m => m.RentspacePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
