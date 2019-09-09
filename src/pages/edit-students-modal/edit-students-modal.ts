import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the EditStudentsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-students-modal',
  templateUrl: 'edit-students-modal.html',
})
export class EditStudentsModalPage {

  validationMessages: any = {
    'apoloFile': {
      'required': 'El CSV es obligatorio.'
    }
  };

  loading: any;


  subject: any = undefined;
  apoloFile: File;
  apoloFileName: string = 'Seleccionar CSV';
  apoloFileSrc: any;
  private subjectId: any;


  fileForm: any;
  formErrors: any = {
    'apoloFile': []
  };
  isenabled: any;


  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private api: ApiProvider,
              private toastCtrl: ToastController,
              private viewCtrl: ViewController,

  ) {

    this.subject = navParams.get('subject');
    this.subjectId = navParams.get('subjectId');


    console.log(this.subject);

    this.fileForm = this.formBuilder.group({
      apoloFile: ['', Validators.required],
    });

    this.apoloFileSrc = '';


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStudentsModalPage');
  }

  onChangeFile(data: any) {
    if (data.files && data.files[0]) {
      let file = data.files[0];

      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.apoloFileSrc = event.target.result;
      };
      reader.readAsDataURL(file);

      this.fileForm.controls['apoloFile'].setValue(file);
      this.apoloFile = file;
      this.apoloFileName = file.name;

      console.log(this.apoloFile);

    }
  }

  onValueChanged(data?: any) {
    var data = data;
    if (!this.fileForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.fileForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.fileForm[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || !checkDirty) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  private uploadCSV() {

    if(this.apoloFile !== null && this.apoloFile !== undefined){

      console.log(this.apoloFile);

      this.presentLoadingCustom();

      let UPMSubjectPK = "UPMSubjectPK(subjectId=" + this.subject.id.subjectId + ",%20semester="
        + this.subject.id.semester + ",%20year=" + this.subject.id.year + ")";

      this.api.uploadMultiPartFile(this.apoloFile, this.subjectId, UPMSubjectPK)
        .subscribe(() => {
          this.loading.dismiss();
          this.viewCtrl.dismiss();

        }, error => {
          console.error(error);
          this.loading.dismiss();
        })

    } else {
      this.toastCtrl.create({
        message: 'Por favor, selecciona antes un fichero CSV válido. ',
        duration: 5000,
        position: 'top'
      }).present();
    }

  }

  private presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Subiendo el CSV...'
    });
    this.loading.present();
  }


}
