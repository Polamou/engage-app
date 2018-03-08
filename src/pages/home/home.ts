import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateIssuePage } from '../create-issue/create-issue';
import { IssuesPage } from '../issues/issues';
import { ProfilePage } from '../profile/profile';

export interface HomePageTab {
  title: string;
  icon: string;
  component: Function;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    tabs: HomePageTab[];

  constructor(public navCtrl: NavController) {
    this.tabs = [
      { title: 'Issues', icon: 'alert', component: IssuesPage },
      { title: 'Profile', icon: 'person', component: ProfilePage }
    ];

  }

}
