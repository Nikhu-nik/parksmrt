import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
   { path: '', redirectTo: 'landing-page', pathMatch: 'full' },

  { path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  // {
  //   path: 'user-details',
  //   loadChildren: () => import('./user/user-details/user-details.module').then( m => m.UserDetailsPageModule)
  // },
  // {
  //   path: 'mybookings',
  //   loadChildren: () => import('./mybookings/mybookings.module').then( m => m.MybookingsPageModule)
  // },
  // {
  //   path: 'messages',
  //   loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  // },
  {

    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule),
  },
  {
    path: 'promocodes',
    loadChildren: () => import('./promocodes/promocodes.module').then( m => m.PromocodesPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },

  // {
  //   path: 'rentspace',
  //   loadChildren: () => import('./rentspace/rentspace.module').then( m => m.RentspacePageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
