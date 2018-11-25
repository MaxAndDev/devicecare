import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the DevicedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devicedetail',
  templateUrl: 'devicedetail.html',
})
export class DevicedetailPage {
  result:Observable<any>

  deviceDetails = [];

  getdeviceinfo_url = "http://localhost:3030/device";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpClient: HttpClient) {
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
    console.log('ionViewDidLoad DevicedetailPage');

    this.result = this.httpClient.get(this.getdeviceinfo_url + "/" + localStorage.getItem('id'));

    console.log(localStorage.getItem('id'));
    this.result.subscribe( data => {
      console.log(data);
      this.deviceDetails.push( data );
    }, error => {
      console.log(error);
      if ( error.status == 404 || 500) {
        this.presentAlert();
      }
    })
  }

}
