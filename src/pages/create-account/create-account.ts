import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  saveNewUser(){
    var userName = "testUser"+Math.floor((Math.random() * 100) + 1);
    var user = {
      "name": userName,
      "password": "changeme",
      "firstname": "Bi",
      "lastname": "Doum",
      "phone": "(460) 614-2120",
      "roles": [
        "citizen"
      ]
    };

    this.userProvider.addUser(user).subscribe(userResponse => {
      console.log('user info sent to API');
      console.log(userResponse);
    });
  }

}
