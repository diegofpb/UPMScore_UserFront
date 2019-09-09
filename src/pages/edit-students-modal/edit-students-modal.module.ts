import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditStudentsModalPage } from './edit-students-modal';

@NgModule({
  declarations: [
    EditStudentsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditStudentsModalPage),
  ],
})
export class EditStudentsModalPageModule {}
