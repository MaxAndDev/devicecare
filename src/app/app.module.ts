import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SigninPage } from '../pages/signin/signin';
import { AddDevicePage } from '../pages/add-device/add-device';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { OverviewPage } from '../pages/overview/overview';
import { DevicedetailPage } from '../pages/devicedetail/devicedetail';
import { ScannerPage } from '../pages/scanner/scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SigninPage,
    AddDevicePage,
    OverviewPage,
    DevicedetailPage,
    ScannerPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SigninPage,
    AddDevicePage,
    OverviewPage,
    DevicedetailPage,
    ScannerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
