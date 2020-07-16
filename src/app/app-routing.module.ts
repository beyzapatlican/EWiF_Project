import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, NavigationExtras, UrlTree} from '@angular/router';

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
import {ReadFeedbackComponent} from './readfeedback/read-feedback.component';
import {AvailableSessionsComponent} from './available-sessions/available-sessions.component';
import {UserpageComponent} from './userpage/userpage.component';
import {QuestionTypeComponent} from './question-type/question-type.component';
import {TruefalseComponent} from './truefalse/truefalse.component';
import {MultiplechoiceComponent} from './multiplechoice/multiplechoice.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {TokenGuard} from '../guards/token.guard';
import {OpenSessionUserCountComponent} from './open-session-user-count/open-session-user-count.component';
import {CreateSessionComponent} from './create-session/create-session.component';
import {RouterGuard} from '../guards/router.guard';
import {StudentSehenComponent } from './student-sehen/student-sehen.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [RouterGuard]
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
    canActivate: [TokenGuard]
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'session-management',
    component: SessionManagementComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'teacher/available-sessions',
    component: AvailableSessionsComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'student/give-feedback',
    component: FeedbackComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'teacher/read-feedback',
    component: ReadFeedbackComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'teacher/change-password',
    component: UserpageComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'student/change-password',
    component: UserpageComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'teacher/question-type',
    component: QuestionTypeComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'multiplechoice',
    component: MultiplechoiceComponent,
    canActivate: [TokenGuard]
  },

  {
    path: 'truefalse',
    component: TruefalseComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'openSessionUserCount',
    component: OpenSessionUserCountComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'createSession',
    component: CreateSessionComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'studentSession',
    component: StudentSehenComponent,
    canActivate: [TokenGuard]
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}

