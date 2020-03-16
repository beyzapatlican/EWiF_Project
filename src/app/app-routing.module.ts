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
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

