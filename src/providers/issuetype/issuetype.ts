import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { config } from '../../app/config';
import { IssueType } from '../../models/issue-type';

/*
  Generated class for the IssuetypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssuetypeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello IssuetypeProvider Provider');
  }

  getIssueTypeList(): Observable<IssueType[]>{
    const url = `${config.apiUrl}/issueTypes`;
    return this.http.get<IssueType[]>(url);
  }

}
