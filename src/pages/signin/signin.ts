import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  result: Observable<any>;

  singup_url = 'http://localhost:3030/user/signup';

  email:string;
  password:string;
  company:string;
  name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  presentAlertErrorExists(){
    let alert = this.alertCtrl.create({
      title: "Ups",
      subTitle: "Mail already exists",
      buttons: ["OK"]
    });
    alert.present();
  }

  presentAlertErrorMail(){
    let alert = this.alertCtrl.create({
      title: "Ups",
      subTitle: "Wrong mail format",
      buttons: ["OK"]
    });
    alert.present();
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "Sign Up",
      subTitle: "Sing Up successfull",
      buttons: ["OK"]
    });
    alert.present();
  }

  onRegister(){
    console.log("email: " + this.email );
    console.log("passsword: " + this.password );
    console.log("company: " + this.company );
    console.log("name: " + this.name );

    this.result = this.httpClient.post(this.singup_url, {
      "email": this.email,
      "password": this.password,
      "company": this.company,
      "name": this.name
    });
    this.result.subscribe( data => {
      console.log(data);
      this.presentAlert();
      this.navCtrl.push(HomePage);
    }, error => {
      console.log(error);
      if (error.status == 409) {
        this.presentAlertErrorExists();
      } else {
        this.presentAlertErrorMail();
      }
    })
  }

}
