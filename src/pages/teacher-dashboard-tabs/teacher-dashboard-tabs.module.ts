import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherDashboardTabsPage } from './teacher-dashboard-tabs';

@NgModule({
  declarations: [
    TeacherDashboardTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherDashboardTabsPage),
  ],
})
export class TeacherDashboardTabsPageModule {}
