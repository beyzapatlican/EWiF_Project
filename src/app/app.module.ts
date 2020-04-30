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
import { QuestionTypeComponent } from './question-type/question-type.component';
import { FreetextComponent } from './freetext/freetext.component';
import { MultiplechoiceComponent } from './multiplechoice/multiplechoice.component';
import {TruefalseComponent} from './truefalse/truefalse.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { SuccessComponent } from './success/success.component';
import {LoginService} from './services/login.service';
import {TokenService} from './services/token.service';
import { NavbartwoComponent } from './navbartwo/navbartwo.component';
import {LoginGuard} from './login.guard';
import {ChangePasswordService} from './services/change-password.service';
import {ForgotUsernameService} from './services/forgot-username.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ResetPasswordService} from './services/reset-password.service';
import {FeedbackComponent} from "./feedback/feedback.component";

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
    QuestionTypeComponent,
    FreetextComponent,
    MultiplechoiceComponent,
    TruefalseComponent,
    SuccessComponent,
    NavbartwoComponent,
    ResetPasswordComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [AuthService, LoginService, LoginGuard, ChangePasswordService, ForgotUsernameService, ForgotPasswordComponent,
    ResetPasswordService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
