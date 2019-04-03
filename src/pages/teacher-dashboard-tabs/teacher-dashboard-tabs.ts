import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {TeacherDashboardPage} from "../teacher-dashboard/teacher-dashboard";

@IonicPage()
@Component({
  selector: 'page-teacher-dashboard-tabs',
  templateUrl: 'teacher-dashboard-tabs.html',
})

export class TeacherDashboardTabsPage {

  tab1Root: any = TeacherDashboardPage;
  //tab2Root: any = HouseListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
