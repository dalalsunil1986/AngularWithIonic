import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { QuotesPage } from '../quotes/quotes';
import * as CryptoJS from 'crypto-js';
import { Userdata } from '../../providers/common/userdata';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;
  loginFailed = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  
  login():void {
      let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.username));         
      let hash = ud !== null ? CryptoJS.PBKDF2(this.password ,ud.salt,{ keySize: 256/32, iterations: 1200 }).toString() : null;
      if(ud !== null && hash === ud.hash) {
          this.loginFailed = false;
          this.navParams.data.username = this.username;
          this.navCtrl.push(QuotesPage, this.navParams);
      } else {          
          console.log(hash === null ? '' : hash +"-"+ud !== null ? ud.hash : '');
          this.loginFailed = true;
      }
  }
  
  signin():void {
      this.navCtrl.push(SigninPage);
  }
}
