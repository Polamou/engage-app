import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { IssueProvider } from '../../providers/issue/issue';

import { Issue } from '../../models/issue';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';

import { CreateIssuePage } from '../create-issue/create-issue';

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
  public comments: Comment[];
  public user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public issueProvider: IssueProvider
  ) {
    this.issueId = navParams.get('issueId');
    this.comments = [];
    this.issueProvider.getIssue(this.issueId).subscribe(issue => {
      console.log('Issue loaded');
      this.issue = issue;
      console.log(this.issue);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleIssuePage');
    this.getComments();
  }

  getComments() {
    this.issueProvider.getIssueCommentList(this.issueId).subscribe(comments => {
      this.comments = comments;
    }), err => {
      console.warn('Could not get comments', err);
    };
  }

  addComment(comment: string){
    this.issueProvider.addComment(this.issueId, comment).subscribe(comment => {
      // Do something
    }), err => {
      console.warn('Could not save new comment', err);
    };
  }

}
