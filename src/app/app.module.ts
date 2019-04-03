import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import { ApiProvider } from '../providers/api/api';
import { UserDataProvider } from '../providers/user-data/user-data';
import {IonicStorageModule} from "@ionic/storage";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TeacherDashboardPage} from "../pages/teacher-dashboard/teacher-dashboard";
import {TeacherDashboardTabsPage} from "../pages/teacher-dashboard-tabs/teacher-dashboard-tabs";
import { BasicAuthInterceptorProvider } from '../providers/basic-auth-interceptor/basic-auth-interceptor';
import {ConstantsProvider} from "../providers/constants/constants";
import {HttpClientProvider} from "../providers/client-http/clientHttp";
import {SubjectPage} from "../pages/subject/subject";
import {CreateEvaluationModalPage} from "../pages/create-evaluation-modal/create-evaluation-modal";
import {PopoverMenuPage} from "../pages/popover-menu/popover-menu";

import {TooltipController, TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CreateAssingmentModalPage} from "../pages/create-assingment-modal/create-assingment-modal";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TeacherDashboardPage,
    TeacherDashboardTabsPage,
    SubjectPage,
    CreateEvaluationModalPage,
    CreateAssingmentModalPage,
    PopoverMenuPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TooltipsModule,
    IonicModule.forRoot(MyApp, {}, {
      links :[
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: TeacherDashboardPage, name: 'TeacherDashboardPage', segment: 'my-teacher-dashboard' },
        { component: SubjectPage, name: 'SubjectPage', segment: 'subject/:subjectId' },
      ]
    }) ,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TeacherDashboardPage,
    TeacherDashboardTabsPage,
    SubjectPage,
    CreateEvaluationModalPage,
    CreateAssingmentModalPage,
    PopoverMenuPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    TooltipController,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptorProvider,
      multi: true
    },
    ApiProvider,
    UserDataProvider,
    BasicAuthInterceptorProvider,
    UserDataProvider,
    ConstantsProvider,
    HttpClientProvider,
  ]
})
export class AppModule {}
