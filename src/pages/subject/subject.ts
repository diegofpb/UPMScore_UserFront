import {Component} from '@angular/core';
import {
  FabContainer,
  IonicPage,
  ModalController,
  ModalOptions,
  NavController,
  NavParams,
  PopoverController,
  ToastController
} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {ConstantsProvider} from "../../providers/constants/constants";
import {PopoverMenuPage} from "../popover-menu/popover-menu";
import {CreateEvaluationModalPage} from "../create-evaluation-modal/create-evaluation-modal";
import {CreateAssingmentModalPage} from "../create-assingment-modal/create-assingment-modal";
import {EditStudentsModalPage} from "../edit-students-modal/edit-students-modal";

/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  upmSubjectMap = new Map();

  upmKeys = [];


  appType = 'Evaluaciones';
  infoType = 'Asignatura';

  selectedEvaluation;
  evaluationInfo: any;


  subject: any = undefined;
  subjectId: any = null;

  students: any = [];
  evaluations: any = null;

  assingments: any = null;

  upmSubjects: any = null;
  teachers: any = null;

  students_evaluations = new Map();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private constants: ConstantsProvider,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              public popoverCtrl: PopoverController,) {

    console.log(this.navParams.data);
    this.subject = this.navParams.get("subject");

    if (this.subject === undefined) {
      this.subjectId = this.navParams.get("subjectId");
      if (this.subjectId !== null) {
        this.api.getURL(this.constants.HOST +
          this.constants.SUBJECTS + "/" + this.subjectId).subscribe((res) => {
          console.log(res);
          this.subject = res;
          this.subjectId = res.id;
          this.getStudentsAndEvaluations();
          this.getUPMSubjectsAndTeachers()
        });
      }
    } else {
      this.subjectId = this.subject.id;
      this.getStudentsAndEvaluations();
      this.getUPMSubjectsAndTeachers()

    }


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  getUPMSubjectsAndTeachers() {

    this.api.getURL(this.constants.HOST + this.constants.SUBJECTS + "/"
      + this.subject.id + this.constants.UPM_SUBJECTS).subscribe((res) => {
      this.upmSubjects = res._embedded.uPMSubjects;
      console.log(this.upmSubjects);
      this.getStudentsFromUpmSubjects();
    });

    this.api.getURL(this.constants.HOST + this.constants.SUBJECTS + "/"
      + this.subject.id + this.constants.TEACHERS).subscribe((res) => {
      this.teachers = res._embedded.teachers;
    });
  }


  getStudentsFromUpmSubjects() {

    this.students = [];
    this.upmSubjectMap.clear();
    this.upmKeys = [];

    for (let upmSubject of this.upmSubjects) {

      this.api.getURL(this.constants.HOST + this.constants.UPM_SUBJECTS_EP + "/UPMSubjectPK(subjectId="
        + upmSubject.id.subjectId + ",%20semester=" + upmSubject.id.semester + ",%20year=" +
        upmSubject.id.year + ")" + this.constants.STUDENTS + "?sort=surname,asc").subscribe((res) => {
        this.students = this.students.concat(res._embedded.students);

        this.upmSubjectMap.set(upmSubject, res._embedded.students);
        this.upmKeys.push(upmSubject);

        for (let student of res._embedded.students) {
          this.students_evaluations.set(student, null);
        }
      });
    }

    console.log(this.students_evaluations);
  }


  getStudentsAndEvaluations() {

    this.api.getURL(this.constants.HOST + this.constants.SUBJECTS + "/"
      + this.subject.id + this.constants.EVALUATIONS).subscribe((res) => {
      this.evaluations = res._embedded.evaluations;

      if (this.evaluations !== null && this.evaluations.length !== 0) {
        this.selectedEvaluation = this.evaluations[0].name;
        this.getAssingmentsOfEvaluation(this.evaluations[0]);

        for (let ev of this.evaluations) {
          this.api.getURL(this.constants.HOST + this.constants.EVALUATIONS + "/"
            + ev.id + this.constants.STUDENTS).subscribe((res) => {
            console.log(res._embedded.students);

            for (let student of res._embedded.students) {
              if (this.students_evaluations.has(student)) {
                this.students_evaluations.delete(student);
                this.students_evaluations.set(student, ev)
              }
            }

          });
        }


      }

      if (this.evaluations !== null && this.evaluations.length === 0) {
        this.selectedEvaluation = null;
        this.assingments = undefined;
      }
    });


  }


  importEvaluation(fab: FabContainer) {
    this.toastCtrl.create({
      message: 'Esta opción no está disponible por el momento.⛔️',
      duration: 8000,
      position: 'top',
      cssClass: "toast-class"
    }).present();
    fab.close();
  }

  createEvaluation(fab: FabContainer, evaluation: any) {

    if (fab !== null) {
      fab.close();
    }

    if (evaluation !== null || evaluation !== undefined) {
      evaluation = this.evaluations.find(ev => ev.name === this.selectedEvaluation);
    }

    const createModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    const createModal =
      this.modalCtrl.create(CreateEvaluationModalPage, {
        subjectId: this.subjectId,
        previousEvaluation: evaluation
      }, createModalOptions);

    createModal.present();

    createModal.onDidDismiss((evaluation) => {
      console.log(evaluation);
      this.getStudentsAndEvaluations();
    })

  }

  deleteAssingmentOfEvaluation(evaluation: any) {

  }

  getAssingmentsOfEvaluation(evaluationToFind: any) {


    if (evaluationToFind === undefined) {
      console.log("NO SE HA PASADO EVALUACION SE INTENTARA OBTENER DEL SELECTOR...");
      evaluationToFind = this.evaluations.find(ev => ev.name === this.selectedEvaluation);
    }

    if (evaluationToFind === undefined) {
      console.log("NO SE HA ENCONTRADO EVALUACION EN LA LISTA.");
      evaluationToFind = this.selectedEvaluation;
    }

    if (evaluationToFind === 'NUEVA EVALUACIÓN') {
      console.log("ESTAS CREANDO NUEVA EVALUACION.");
      this.assingments = undefined;
      this.createEvaluation(null, null);
    } else {
      console.log("HAS ESCOGIDO UNA ASIGNATURA DEL SELECTOR.");
      console.log(this.selectedEvaluation);

      this.api.getURL(this.constants.HOST + this.constants.EVALUATIONS + "/"
        + evaluationToFind.id).subscribe((res) => {
        console.log(res);
        this.evaluationInfo = res;
      });

      this.api.getURL(this.constants.HOST + this.constants.EVALUATIONS + "/"
        + evaluationToFind.id + this.constants.ASSINGMENTS).subscribe((res) => {
        console.log("AQUI TIENE SUS TAREAS");
        console.log(res);
        this.assingments = res._embedded.assingments;
      })
    }


  }

  createAssingment(fab1: any, selectedAssingment: any) {

    if (fab1 !== null) {
      fab1.close();
    }

    const createModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    let evaluationToFind = this.evaluations.find(ev => ev.name === this.selectedEvaluation);

    const createModal =
      this.modalCtrl.create(CreateAssingmentModalPage, {
        evaluationId: evaluationToFind.id,
        previousAssingment: selectedAssingment
      }, createModalOptions);

    createModal.present();

    createModal.onDidDismiss((assingment) => {
      if (assingment !== null) {
        this.getStudentsAndEvaluations();
      }
    })

  }

  editMarks(assingment: any) {

  }


  editEvaluacion(alumno: any, evaluacion: any) {

  }

  addStudents(key: any, subjectId: any) {

    const createModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    const createModal =
      this.modalCtrl.create(EditStudentsModalPage, {subject: key, subjectId: subjectId}, createModalOptions);

    createModal.present();

    createModal.onDidDismiss(() => {
      this.getStudentsAndEvaluations();
      this.getStudentsFromUpmSubjects();
    })


  }

  getEvaluationsOfStudents() {


  }


}

export class UPMSubjectInfo {

  name: String;
  students: any = [];

}
