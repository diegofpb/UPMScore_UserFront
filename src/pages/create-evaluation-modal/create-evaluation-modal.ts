import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstantsProvider} from "../../providers/constants/constants";

/**
 * Generated class for the CreateEvaluationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-evaluation-modal',
  templateUrl: 'create-evaluation-modal.html',
})
export class CreateEvaluationModalPage {

  createdEvaluation: any;

  evaluationForm: any = FormGroup;
  formErrors: any = {
    'minimumGrade': [],
    'name': []
  };

  previousEvaluation: any = null;

  validationMessages: any = {
    'minimumGrade': {
      'required': 'La nota mínima de la evaluación es obligatoria.',
      'min':'La nota mínima debe de ser mayor o igual a 1.',
      'max':'La nota mínima debe de ser menor o igual a 10.'
    },
    'name': {
      'required': 'El nombre de la evaluación es obligatorio.',
    }
  };

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private viewCtrl: ViewController,
              private api: ApiProvider,
              private formBuilder: FormBuilder,
              private constants: ConstantsProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController
  ) {

    this.previousEvaluation = navParams.get('previousEvaluation');

    this.evaluationForm = this.formBuilder.group({
      minimumGrade: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      name: ['', Validators.required],
      subject: [this.constants.HOST + this.constants.SUBJECTS + '/' + navParams.get('subjectId')]
    });

    if (this.previousEvaluation !== undefined){
      this.evaluationForm.get("minimumGrade").setValue(this.previousEvaluation.minimumGrade);
      this.evaluationForm.get("name").setValue(this.previousEvaluation.name);
    }


    this.evaluationForm.valueChanges.subscribe(() => this.onValueChanged());


  }

  onValueChanged() {
    if (!this.evaluationForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.evaluationForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.evaluationForm[field] = '';
      const control = form.get(field);
      if (control && (control.dirty || !checkDirty) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEvaluationModalPage');
  }

  createEvaluation() {
    if (this.evaluationForm.valid) {
      this.api.postEvaluationOfSubject(this.evaluationForm.value).subscribe((value) => {
        console.log(value);
        this.createdEvaluation = value;
      });
    }

    this.viewCtrl.dismiss(this.createdEvaluation);
  }

  closeModal() {
    this.viewCtrl.dismiss()
  }

  deleteEvaluation() {
    const confirm = this.alertCtrl.create({
      title: '¿Estás seguro que deseas eliminar?',
      message: 'Estás a punto de borrar la evaluación '+ this.previousEvaluation.name +
        ' del sistema. Esta acción no se puede deshacer.\n ¿Estás seguro que deseas hacerlo?',
      buttons: [
        {
          text: 'No, cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sí, eliminar',
          handler: () => {
            console.log('Agree clicked');
            this.api.deleteUrl(this.constants.HOST + this.constants.EVALUATIONS + "/" + this.previousEvaluation.id).subscribe(() => {
              this.navCtrl.pop();
            }, (error) => {
              let toast = this.toastCtrl.create({
                duration: 8000,
                position: 'top',
                cssClass: "toast-class",
                message: error.message
              });
              if (error.status === 500) {
                toast.setMessage("Error en el servidor (500) ⚠️")
              }
              console.log(error);
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
