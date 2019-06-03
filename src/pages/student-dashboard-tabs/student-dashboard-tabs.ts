import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {ConstantsProvider} from "../../providers/constants/constants";
import {TeacherDashboardPage} from "../teacher-dashboard/teacher-dashboard";

/**
 * Generated class for the StudentDashboardTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-dashboard-tabs',
  templateUrl: 'student-dashboard-tabs.html',
})
export class StudentDashboardTabsPage {

  student: any;
  asignaturasNumber : number;
  tab1Root: any = StudentDashboardTabsPage;
  //tab2Root: any = HouseListPage;
  mySelectedIndex: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public events: Events,
              public userData: UserDataProvider,
              public constants: ConstantsProvider) {

    this.userData.getUserForLogin().subscribe((user) => {
      this.api.getURL(this.constants.HOST + this.constants.TEACHERS +
        this.constants.FIND_BY_EMAIL + "?email=" + user.username).subscribe((student) => {
        this.student = student;
        this.getSubjectsNumberFromStudentId(this.student.id);
      });
    });

    this.mySelectedIndex = navParams.data.tabIndex || 0;

  }

  public updateTabBadge(): void {
    this.events.publish('asignaturas:updated', this.asignaturasNumber);
  }

  private getSubjectsNumberFromStudentId(studentId: any) {
    this.api.getURL(this.constants.HOST + this.constants.STUDENTS + "/" + studentId + this.constants.SUBJECTS)
      .subscribe((response) => {
        this.asignaturasNumber = response._embedded.subjects.length;
        this.updateTabBadge()
      });
  }
}
