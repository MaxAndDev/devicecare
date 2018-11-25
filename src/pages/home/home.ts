import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SigninPage } from '../signin/signin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result:Observable<any>

  login_url = "http://localhost:3030/user/login";

  email:string;
  password:string;
  token:string;

  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public httpClient:HttpClient) {

  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "Ups",
      subTitle: "Wrong password or email",
      buttons: ["OK"]
    });
    alert.present();
  }

  onLogin() {
    console.log("email: " + this.email);
    console.log("password: " + this.password);

    this.result = this.httpClient.post(this.login_url, {
      "email": this.email,
      "password": this.password
    })

    
    this.result.subscribe( data => {
      console.log(data);
      this.token = data.token;
      console.log(this.token);
      localStorage.setItem("token", this.token);
      this.navCtrl.push(LoginPage);
    }, error => {
      console.log(error);
      this.presentAlert();
    })
  }

  onSignin(){
    this.navCtrl.push(SigninPage);
  }

}
