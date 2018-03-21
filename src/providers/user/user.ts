import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { config } from '../../app/config';

import { User } from '../../models/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUserList(): Observable<User[]>{
    const url = `${config.apiUrl}/users`;
    return this.http.get<User[]>(url);
  }

  getUser(id: String): Observable<User>{
    const url = `${config.apiUrl}/isuserssues/${id}`;
    return this.http.get<User>(url);
  }

}
