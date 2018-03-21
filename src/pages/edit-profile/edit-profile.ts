import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  public user: User;

  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
 * If true, it means that the authentication API has return a failed response
 * (probably because the name or password is incorrect).
 */
loginError: boolean;

  /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user');
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

  // Hide any previous login error.
  this.loginError = false;


}

}
