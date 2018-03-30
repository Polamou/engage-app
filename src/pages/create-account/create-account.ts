import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthRequest } from '../../models/auth-request';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { NewUser } from '../../models/new-user';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
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
   * This object will be updated when the user edits the form
   */
  newUser: NewUser;

  /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(
    private auth: AuthProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
  ) {
    this.newUser = new NewUser();
    this.authRequest = new AuthRequest();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  onSubmit($event){

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Set the defaults role
    this.newUser.roles = ['citizen'];

    this.userProvider.addUser(this.newUser).subscribe(userResponse => {
      console.log('user info sent to API');
      console.log(userResponse);
      
      // If the user was successfully created,
      // perform the authentication request to the API with the set params.
      this.authRequest.name = this.newUser.name;
      this.authRequest.password = this.newUser.password;
      
      this.auth.logIn(this.authRequest).subscribe(undefined, err => {
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      });
    },
    err => {
      console.warn(`Account creation failed: ${err.message}`);
    });
  }
  
}
