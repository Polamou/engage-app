import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { config } from '../../app/config';

import { User } from '../../models/user';
import { NewUser } from '../../models/new-user';

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

  getUserList(page?: number, pageSize?: number, sort?: string): Observable<User[]>{
    const url = `${config.apiUrl}/users`;
    var httpParams: any = {};
    if(!page === false){httpParams.page = page.toString()};
    if(!pageSize === false){httpParams.pageSize = pageSize.toString()};
    if(!sort === false){httpParams.sort = sort};
    const options = {"params": httpParams}
    return this.http.get<User[]>(url, options);
  }

  getUser(id: String): Observable<User>{
    const url = `${config.apiUrl}/users/${id}`;
    return this.http.get<User>(url);
  }

  addUser(user: NewUser): Observable<User>{
    const url = `${config.apiUrl}/users`;
    return this.http.post<User>(url, user);
  }

  updateUser(id: String, params: Object): Observable<User>{
    const url = `${config.apiUrl}/users/${id}`;
    return this.http.patch<User>(url, params);
  }
}
