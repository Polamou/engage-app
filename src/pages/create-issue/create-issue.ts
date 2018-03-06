import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'
import { config } from '../../app/config';
/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})
export class CreateIssuePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private auth: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    const url = `${config.apiUrl}/issueTypes`;
    console.log('ionViewDidLoad CreateIssuePage');
    this.http.get(url).subscribe(issueTypes=>{
      console.log(`Issues types loaded`,issueTypes);
    })
  }

  logOut() {
    this.auth.logOut();
  }
}
