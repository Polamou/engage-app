import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SingleIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-issue',
  templateUrl: 'single-issue.html',
})
export class SingleIssuePage {
  public issueId: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello IssueProvider Provider');
    this.issueId = navParams.get('issueId');
    console.log(this.issueId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleIssuePage');
  }

}
