import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAssingmentModalPage } from './create-assingment-modal';

@NgModule({
  declarations: [
    CreateAssingmentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAssingmentModalPage),
  ],
})
export class CreateAssingmentModalPageModule {}
