import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';
import { AuthenticationPageModule } from './pages/authentication/authentication.module';
import { AuthenticationPage } from './pages/authentication/authentication.page';
import { RegisterPage } from './pages/authentication/register.page';

export function tokenGetterFactory() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    AuthenticationPage,
    RegisterPage
  ],
  imports: [BrowserModule,
    AuthenticationPageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        authScheme: 'Bearer ',
        tokenGetter: tokenGetterFactory,
        whitelistedDomains: ['localhost:8000', 'localhost:8100', 'localhost:8080', 'localhost:4200', 'localhost:3000',
        'api-tech-nic.herokuapp.com']
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ErrorService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailComposer,
    FingerprintAIO,
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  token: string;
  isLogged: boolean;
}
