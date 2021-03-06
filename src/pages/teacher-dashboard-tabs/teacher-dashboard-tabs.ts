import { Component } from '@angular/core';
import {Events, IonicPage, NavParams} from 'ionic-angular';
import {TeacherDashboardPage} from "../teacher-dashboard/teacher-dashboard";
import {ApiProvider} from "../../providers/api/api";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {ConstantsProvider} from "../../providers/constants/constants";

@IonicPage()
@Component({
  selector: 'page-teacher-dashboard-tabs',
  templateUrl: 'teacher-dashboard-tabs.html',
})

export class TeacherDashboardTabsPage {

  teacher: any;
  asignaturasNumber : number;
  tab1Root: any = TeacherDashboardPage;
  //tab2Root: any = HouseListPage;
  mySelectedIndex: number;

  constructor(public navParams: NavParams,
              public api: ApiProvider,
              public events: Events,
              public userData: UserDataProvider,
              public constants: ConstantsProvider) {

    this.userData.getUserForLogin().subscribe((user) => {
      this.api.getURL(this.constants.HOST + this.constants.TEACHERS +
        this.constants.FIND_BY_EMAIL + "?email=" + user.username).subscribe((teacher) => {
        this.teacher = teacher;
        this.getSubjectsNumberFromTeacherId(this.teacher.id);
      });
    });

    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  public updateTabBadge(): void {
    this.events.publish('asignaturas:updated', this.asignaturasNumber);
  }

  getSubjectsNumberFromTeacherId(teacherid: any) {
    this.api.getURL(this.constants.HOST + this.constants.TEACHERS + "/" + teacherid + this.constants.SUBJECTS)
      .subscribe((response) => {
        this.asignaturasNumber = response._embedded.subjects.length;
        this.updateTabBadge()
      });
  }



}
