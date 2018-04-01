import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthRequest } from '../../models/auth-request';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public userId: any;
  public user: User;

  /**
   * The update form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
    // Get the userId from navParams
    this.userId = navParams.get('userId');
    // Request fresh info about the user from the API
    this.userProvider.getUser(this.userId).subscribe(user => {
      console.log('user info requested from API');
      console.log(user);
      this.user = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    console.log(this.user);
  }

  onSubmit($event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    this.userProvider.updateUser(this.userId, this.user).subscribe(updatedUser => {
      console.log('user info sent to API');
      console.log(updatedUser);
      this.user = updatedUser;
      // to do:
      // show a message on the page to confirm the user was updated
    });
  }
}
