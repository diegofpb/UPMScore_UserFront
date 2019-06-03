import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentDashboardTabsPage } from './student-dashboard-tabs';

@NgModule({
  declarations: [
    StudentDashboardTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentDashboardTabsPage),
  ],
})
export class StudentDashboardTabsPageModule {}
