import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html',
})
export class AddDevicePage {
  result:Observable<any>

  addDevice_url = "http://localhost:3030/device";

  model:string;
  producer:string;
  owner:string;

  accessories = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDevicePage');
  }

  selectRadioButton(value){
      console.log(value);
      this.accessories.push(value);
      console.log(this.accessories);
  }


  presentAlertError(){
    let alert = this.alertCtrl.create({
      title: "Add Device",
      subTitle: "Somthing went wrong",
      buttons: ["OK"]
    });
    alert.present();
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "Add Device",
      subTitle: "Device added successfull",
      buttons: ["OK"]
    });
    alert.present();
  }

  addDevice(){
    console.log(this.model);
    console.log(this.producer);
    console.log(this.owner);

    //look here for handling tooken 
    // https://stackoverflow.com/questions/32088399/ionic-how-to-store-session-token-as-globally-for-app-accessible-variable
    console.log(localStorage.getItem("token"));
   
    this.result = this.httpClient.post(this.addDevice_url, {
      "model": this.model,
      "producer": this.producer,
      "owner": this.owner,
      "status": "existing",  
      "accessories": this.accessories
    })

    this.result.subscribe( data => {
      console.log(data);
      this.presentAlert();
      this.model = "";
      this.producer = "";
      this.owner = "";
    }, error => {
      console.log(error);
      if (error.status  == 401 ) {
        localStorage.setItem('token', '');
        this.navCtrl.push(LoginPage);
      }
      this.presentAlertError();
    })

    
  }

}
