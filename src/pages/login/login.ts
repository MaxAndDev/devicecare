import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AddDevicePage } from '../add-device/add-device';
import { OverviewPage } from '../overview/overview';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DevicedetailPage } from '../devicedetail/devicedetail';
import { ScannerPage } from '../scanner/scanner';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  result:Observable<any>

  devices = [];

  getdevice_url = "http://localhost:3030/device";

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public alertCtrl: AlertController) {
  }

  onView(){
    console.log("View was pressed");
    this.navCtrl.push(OverviewPage);
    
  }

  clickedItem(id){
    console.log("clicked");
    console.log(id);
    localStorage.setItem('id',id);
    this.navCtrl.push(DevicedetailPage);
  }

  onAdd(){
    console.log("Add was pressed");
    this.navCtrl.push(AddDevicePage);
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "Ups",
      subTitle: "Something went wrong",
      buttons: ["OK"]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.result = this.httpClient.get(this.getdevice_url);

    this.result.subscribe( data => {
      this.devices.push( data.devices );
      console.log(this.devices);
    }, error => {
      console.log(error);
      if (error.status  == 401 ) {
        localStorage.setItem('token', '');
        this.navCtrl.push(LoginPage);
      } else {
        this.presentAlert();
      }
    })
  }

  clickQRScan(){
    console.log("Call QR Scanner");
    this.navCtrl.push(ScannerPage);
  }

}
