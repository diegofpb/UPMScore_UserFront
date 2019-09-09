import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstantsProvider} from "../../providers/constants/constants";

/**
 * Generated class for the CreateAssingmentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-assingment-modal',
  templateUrl: 'create-assingment-modal.html',
})
export class CreateAssingmentModalPage {

  createdAssingment: any;
  evaluationId: any;
  assingmentForm: any = FormGroup;
  formErrors: any = {
    'minimumGrade': [],
    'name': []
  };

  previousAssingment: any = null;


  validationMessages: any = {
    'minimumGrade': {
      'required': 'La nota mínima de la evaluación es obligatoria.',
      'min': 'La nota mínima debe de ser mayor o igual a 1.',
      'max': 'La nota mínima debe de ser menor o igual a 10.'
    },
    'name': {
      'required': 'El nombre de la evaluación es obligatorio.',
    },
    'weight': {
      'required': 'El peso de la tarea es obligatorio.',
      'min': 'El peso de esta tarea debe de ser mayor o igual a 1.',
      'max': 'El peso de esta tarea debe de ser menor o igual a 100.'
    },
    'numberOfParticipants': {
      'required': 'El numero de participantes es obligatorio.',
      'min': 'El número de participantes ha de ser mayor o igual a 1.'
    }
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private api: ApiProvider,
              private formBuilder: FormBuilder,
              private constants: ConstantsProvider) {

    this.previousAssingment = navParams.get('previousAssingment');
    this.evaluationId = navParams.get('evaluationId');


    this.assingmentForm = this.formBuilder.group({
      minimumGrade: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      name: ['', Validators.required],
      weight: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],
      numberOfParticipants: ['', Validators.compose([Validators.required, Validators.min(1)])],
      evaluation: [this.constants.HOST + this.constants.EVALUATIONS + '/' + navParams.get('evaluationId')]
    });

    if (this.previousAssingment !== null && this.previousAssingment !== undefined) {
      this.assingmentForm.get("minimumGrade").setValue(this.previousAssingment.minimumGrade);
      this.assingmentForm.get("name").setValue(this.previousAssingment.name);
      this.assingmentForm.get("weight").setValue(this.previousAssingment.weight);
      this.assingmentForm.get("numberOfParticipants").setValue(this.previousAssingment.numberOfParticipants);
    }

    this.assingmentForm.valueChanges.subscribe(() => this.onValueChanged());

  }

  onValueChanged() {
    if (!this.assingmentForm) {
      return;
    }
    this.checkErrors(true);
  }

  private checkErrors(checkDirty: boolean) {
    const form = this.assingmentForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.assingmentForm[field] = '';
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
    console.log('ionViewDidLoad CreateAssingmentModalPage');
    console.log(this.previousAssingment)

  }

  createAssingment() {
    if (this.assingmentForm.valid && this.previousAssingment == undefined) {
      this.api.postAssingmentOfEvaluation(this.assingmentForm.value).subscribe((value) => {
        console.log(value);
      });
    } else if (this.assingmentForm.valid && this.previousAssingment !== undefined) {
      this.api.putPreviousAssingmentOfSubject(this.evaluationId, this.assingmentForm.value, this.previousAssingment.id).subscribe((value) => {
        console.log(value);
        this.createdAssingment = value;
      });
    }

    this.viewCtrl.dismiss(this.createdAssingment);

  }

  closeModal() {
    this.viewCtrl.dismiss()
  }
}
