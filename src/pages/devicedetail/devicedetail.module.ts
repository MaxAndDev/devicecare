import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicedetailPage } from './devicedetail';

@NgModule({
  declarations: [
    DevicedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DevicedetailPage),
  ],
})
export class DevicedetailPageModule {}
