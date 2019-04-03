import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {UserDataProvider} from "../../providers/user-data/user-data";
import {ConstantsProvider} from "../../providers/constants/constants";
import {ApiProvider} from "../../providers/api/api";
import {TeacherDashboardTabsPage} from "../teacher-dashboard-tabs/teacher-dashboard-tabs";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: UserOptions = {username: '', password: ''};
  submitted = false;

  @ViewChild('username') usernameInput: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserDataProvider,
              private toastCtrl: ToastController,
              public api: ApiProvider,
              public constants: ConstantsProvider,
              public loadingCtrl: LoadingController) {
  }


  static ionViewDidEnter() {
    console.log('[LOGIN] LOADED 👌');
  }

  ngOnInit() {
    this.toastCtrl.create({
      message: 'AppVer 1.0 · Developed by @diegofpb 👨‍💻',
      duration: 2500,
      position: 'bottom',
      cssClass: "toast-class"
    }).present();
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    let toast = this.toastCtrl.create({
      message: 'Usuario o contraseña no válido ⛔️',
      duration: 8000,
      position: 'top',
      cssClass: "toast-class"
    });

    if (form.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Inciando sesión... 🕒',
        spinner: 'crescent',
      });

      loading.present();

      this.userData.setUserForLogin(form.value.username, form.value.password).then((() => {
        this.api.getURL(this.constants.HOST + "/auth").subscribe(
          (res) => {
            if (res.authority === 'ROLE_TEACHER') {
              this.navCtrl.push(TeacherDashboardTabsPage);

            } else if (res.authority === 'ROLE_STUDENT') {
              toast.setMessage("El panel de estudiante no está listo aún");
              toast.present();
            } else {
              toast.setMessage("Su usuario no tiene privilegios necesarios");
              toast.present();
            }
            this.userData.login();
            toast.dismissAll();
          }, (error) => {
            if (error.status === 500) {
              toast.setMessage("Error en el servidor (500) ⚠️")
            }
            console.log(error);
            toast.present();
          }
        );

        loading.dismissAll();

      }));
    }

  }
}


export interface UserOptions {
  username: string,
  password: string
}
