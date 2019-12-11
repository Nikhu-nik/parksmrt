import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { HideHeaderDirective } from './_helpers/hide-header.directive';

@NgModule({
  declarations: [AppComponent, HideHeaderDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicHeaderParallaxModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    HttpParams,
    Geolocation,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
