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
import {UserpageComponent} from './userpage/userpage.component';

const routes: Routes = [
  { path: '',
    component: HomepageComponent
  },
  { path: 'signIn',
    component: SignInComponent
  },
  { path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  }
  ,
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
    component: LehrerComponent
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
    path: 'give-feedback',
    component: FeedbackComponent
  },
  {
    path: 'read-feedback',
    component: ReadfeedbackComponent
  },
  {
    path: 'app-userpage',
    component: UserpageComponent
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

