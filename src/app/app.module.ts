import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RatingModule} from 'ng-starrating';

import { AppComponent } from './app.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {FooterComponent} from './footer/footer.component';
import {LehrerComponent} from './lehrer/lehrer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {StudentComponent} from './student/student.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';
import { SessionManagementComponent } from './session-management/session-management.component';
import { AvailableSessionsComponent } from './available-sessions/available-sessions.component';
import {UserpageComponent} from './userpage/userpage.component';
import { StarratingComponent } from './starrating/starrating.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    FooterComponent,
    LehrerComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    StudentComponent,
    HomepageComponent,
    AboutComponent,
    ContactComponent,
    ForgotUsernameComponent,
    SessionManagementComponent,
    AvailableSessionsComponent,
    SessionManagementComponent,
    UserpageComponent,
    StarratingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
