import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {ConstantsProvider} from "../../providers/constants/constants";
import {SubjectPage} from "../subject/subject";
import {PopoverMenuPage} from "../popover-menu/popover-menu";

/**
 * Generated class for the TeacherDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-dashboard',
  templateUrl: 'teacher-dashboard.html',
})
export class TeacherDashboardPage {

  teacher: any;
  subjects: any = null;
  evaluations: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private userData: UserDataProvider,
              private constants: ConstantsProvider,
              private toastCtrl: ToastController,
              public popoverCtrl: PopoverController,

  ) {

    this.userData.getUserForLogin().subscribe((user) => {
      this.api.getURL(this.constants.HOST + this.constants.TEACHERS +
        this.constants.FIND_BY_EMAIL + "?email=" + user.username).subscribe((teacher) => {
        this.teacher = teacher;
        this.getSubjectsFromTeacherId(teacher.id);
      }, (error) => {
        this.toastCtrl.create({
          message: 'Error al obtener el profesor',
          duration: 2500,
          position: 'bottom',
          cssClass: "toast-class"
        }).present();

        this.navCtrl.goToRoot(null);

      });

    }, (error) => {
      this.toastCtrl.create({
        message: 'Error al obtener el profesor',
        duration: 2500,
        position: 'bottom',
        cssClass: "toast-class"
      }).present();

      this.navCtrl.goToRoot(null);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherDashboardPage');
  }

  getSubjectsFromTeacherId(teacherid: any) {
    this.api.getURL(this.constants.HOST + this.constants.TEACHERS + "/" + teacherid + this.constants.SUBJECTS)
      .subscribe((response) => {
        this.subjects = response._embedded.subjects;
        for (let subject of this.subjects) {
          this.getEvaluations(subject.id)
        }

      });
  }

  getEvaluations(subjectId: any) {
    this.api.getURL(this.constants.HOST + this.constants.SUBJECTS + "/" + subjectId + this.constants.EVALUATIONS)
      .subscribe((response) => {
        console.log(response);
      });
  }


  openSubject(asignatura: any) {
    this.navCtrl.push(SubjectPage,
      {
        "subjectId": asignatura.id,
        "subject": asignatura
      });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }
}
