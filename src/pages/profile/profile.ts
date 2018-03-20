import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AboutPage } from '../about/about';
import { HelpPage } from '../help/help';
import { User } from '../../models/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider
  ) {
    this.auth.getUser().subscribe(user => {
      console.log('User loaded');
      this.user = user;
      // console.log(this.user);
    }, err => {
      console.warn('Could not get user', err);
    });
  }

  ngOnInit() {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logOut() {
    this.auth.logOut();
  }

  goToEditProfile() {
    this.navCtrl.push(EditProfilePage, { user: this.user });
  }

  goToAbout() {
    this.navCtrl.push(AboutPage);
  }

  goToHelp() {
    this.navCtrl.push(HelpPage);
  }
}
