import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEvaluationModalPage } from './create-evaluation-modal';

@NgModule({
  declarations: [
    CreateEvaluationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEvaluationModalPage),
  ],
})
export class CreateEvaluationModalPageModule {}
