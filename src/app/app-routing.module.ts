import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ForgotUsernameComponent} from './forgot-username/forgot-username.component';
import {LehrerComponent} from './lehrer/lehrer.component';
import {StudentComponent} from './student/student.component';
import {SessionManagementComponent} from './session-management/session-management.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ReadfeedbackComponent} from './readfeedback/readfeedback.component';
import {AvailableSessionsComponent} from './available-sessions/available-sessions.component';
import {UserpageComponent} from './userpage/userpage.component';
import {QuestionTypeComponent} from './question-type/question-type.component';
import {TruefalseComponent} from './truefalse/truefalse.component';
import {MultiplechoiceComponent} from './multiplechoice/multiplechoice.component';
import {SuccessComponent} from './success/success.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Token} from './guards/token.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'forgot-username',
    component: ForgotUsernameComponent
  },
  {
    path: 'teacher',
    component: LehrerComponent,
    canActivate: [Token]
  },
  {
    path: 'student-pin',
    component: StudentComponent
  },
  {
    path: 'session-management',
    component: SessionManagementComponent
  },
  {
    path: 'available-sessions',
    component: AvailableSessionsComponent
  },
  {
    path: 'give-feedback',
    component: FeedbackComponent,
    canActivate: [Token]
  },
  {
    path: 'read-feedback',
    component: ReadfeedbackComponent,
    canActivate: [Token]
  },
  {
    path: 'userpage',
    component: UserpageComponent,
    canActivate: [Token]
  },
  {
    path: 'app-userpage',
    component: UserpageComponent,
    canActivate: [Token]
  },
  {
    path: 'question-type',
    component: QuestionTypeComponent
  },
  {
    path: 'multiplechoice',
    component: MultiplechoiceComponent
  },

  {
    path: 'truefalse',
    component: TruefalseComponent
  },
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [Token]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [Token]
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

