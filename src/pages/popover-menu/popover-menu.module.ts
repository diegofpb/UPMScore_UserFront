import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverMenuPage } from './popover-menu';

@NgModule({
  declarations: [
    PopoverMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverMenuPage),
  ],
})
export class PopoverMenuPageModule {}
