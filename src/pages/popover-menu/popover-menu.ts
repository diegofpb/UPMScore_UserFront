import {Component} from '@angular/core';
import {App, IonicPage, ToastController, ViewController} from 'ionic-angular';
import {UserDataProvider} from "../../providers/user-data/user-data";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Opciones</ion-list-header>
      <button ion-item (click)="closeSession()">Cerrar Sesión</button>
    </ion-list>
  `
})
export class PopoverMenuPage {

  constructor(public viewCtrl: ViewController,
              public userData: UserDataProvider,
              public toastCtrl: ToastController,
              public appCtrl: App) {}

  close() {
    this.viewCtrl.dismiss();
  }

  closeSession(){
    this.viewCtrl.dismiss();
    this.userData.logout();
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.toastCtrl.create({
      message: 'Sesión cerrada correctamente. Hasta pronto. 👋',
      duration: 5000,
      position: 'top',
      cssClass: "toast-class"
    }).present();


  }



}
