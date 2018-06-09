import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import {FlashMessagesModule} from "angular2-flash-messages";

import { AppComponent } from './app.component';
import { NavbarComponent } from './compenents/navbar/navbar.component';
import { LoginComponent } from './compenents/login/login.component';
import { RegisterComponent } from './compenents/register/register.component';
import { HomeComponent } from './compenents/home/home.component';
import { ProfileComponent } from './compenents/profile/profile.component';
import { DashboardComponent } from './compenents/dashboard/dashboard.component';

const appRoutes: Routes= [
	{path:"", component: HomeComponent},
	{path:"register", component: RegisterComponent},
	{path:"login", component: LoginComponent},
	{path:"dashboard", component: DashboardComponent},
	{path:"profile", component: ProfileComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	RouterModule.forRoot(appRoutes),
	FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
