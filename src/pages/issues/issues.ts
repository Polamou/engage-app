import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IssueProvider } from '../../providers/issue/issue';
import { Issue } from '../../models/issue';

/**
 * Generated class for the IssuesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage {
  public issues: Issue[];
  view: string = "map";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public issueProvider: IssueProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuesPage');
    this.issueProvider.getIssuesList().subscribe(issues =>{
      console.log('Issues loaded');
      this.issues = issues;

    })
  }

}
