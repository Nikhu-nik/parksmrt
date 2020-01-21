import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            children: [
              {
                path: 'mybookings',
                loadChildren: () => import('../mybookings/mybookings.module').then( m => m.MybookingsPageModule)
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: 'rentspace',
                loadChildren: () => import('../rentspace/rentspace.module').then( m => m.RentspacePageModule)
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: 'mybookings',
                loadChildren: () => import('../mybookings/mybookings.module').then( m => m.MybookingsPageModule)
              }
            ]
          },
          {
            path: '',
            redirectTo: '/home/home',
            pathMatch: 'full'
          }
        ]
      }
    ])
  ],
  declarations: [HomePage],
  providers: [Geolocation ]
})
export class HomePageModule {}
