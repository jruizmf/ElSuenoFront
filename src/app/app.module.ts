import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './shared/guards/auth.guard';
import { RoleGuardService } from './shared/guards/role.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpRequestInterceptor } from './core/interceptors/http.interceptor';
import { HttpResponseInterceptor } from './core/interceptors/http-response.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpClientModule, 
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    AuthGuardService, 
    RoleGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
