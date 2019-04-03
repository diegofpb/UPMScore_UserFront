import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherDashboardPage } from './teacher-dashboard';

@NgModule({
  declarations: [
    TeacherDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherDashboardPage),
  ],
})
export class TeacherDashboardPageModule {}
