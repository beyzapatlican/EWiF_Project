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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ReadFeedbackService} from '../services/read-feedback.service';
import {ReadFeedbackComponent } from './readfeedback/read-feedback.component';
import { AverageFeedbackComponent } from './average-feedback/average-feedback.component';
import {SessionFeedbackService} from '../services/session-feedback.service';
import {TokenInterceptor} from '../interceptors/token.interceptor';
import { SessionListService} from '../services/session-list.service';
import {UserService} from '../services/user.service';
import { StudentSehenComponent } from './student-sehen/student-sehen.component';
import { OpenSessionUserCountComponent } from './open-session-user-count/open-session-user-count.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { StudentTrueFalseComponent } from './student-sehen/student-true-false/student-true-false.component';
import { StudentFreeTextComponent } from './student-sehen/student-free-text/student-free-text.component';
import {StudentMultipleChoiceComponent} from './student-sehen/student-multiple-choice/student-multiple-choice.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

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
        ResetPasswordComponent,
        AverageFeedbackComponent,
        ReadFeedbackComponent,
        AverageFeedbackComponent,
        StudentSehenComponent,
        OpenSessionUserCountComponent,
        CreateSessionComponent,
        StudentMultipleChoiceComponent,
        StudentTrueFalseComponent,
        StudentFreeTextComponent,
        StudentMultipleChoiceComponent,
        FeedbackComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    PerfectScrollbarModule
  ],

  providers: [ReadFeedbackService, SessionFeedbackService, SessionListService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
