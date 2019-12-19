import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitePage } from './invite.page';

const routes: Routes = [

  {
    path: '',
    component: InvitePage,
    children: [
      {path: '', redirectTo: 'msg', pathMatch: 'full'},
      {path: 'msg',  loadChildren: () => import('./msg/msg.module').then( m => m.MsgPageModule)},
      {path: 'fb',  loadChildren: () => import('./fb/fb.module').then( m => m.FbPageModule)},
      {path: 'whatsapp', loadChildren: () => import('./whatsapp/whatsapp.module').then( m => m.WhatsappPageModule)},
    ],
  },
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitePageRoutingModule {}
