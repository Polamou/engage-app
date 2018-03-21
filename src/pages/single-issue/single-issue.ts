import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IssueProvider } from '../../providers/issue/issue';

import { Issue } from '../../models/issue';

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
  public issue: Issue;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public issueProvider: IssueProvider
  ) {
    console.log('Hello IssueProvider Provider');
    this.issueId = navParams.get('issueId');
    console.log(this.issueId);
    this.issueProvider.getIssue(this.issueId).subscribe(issue => {
      console.log('Issue loaded');
      this.issue = issue;
      console.log(this.issue);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleIssuePage');
  }

}
