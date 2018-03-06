import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IssueProvider } from '../../providers/issue/issue';
import { Issue } from '../../models/issue';

/**
 * Generated class for the IssueListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-list',
  templateUrl: 'issue-list.html',
})
export class IssueListPage {
  public issues: Issue[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public issueProvider: IssueProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueListPage');
    this.issueProvider.getIssuesList().subscribe(issues =>{
      console.log('Issues loaded');
      this.issues = issues;

    })
  }

}
