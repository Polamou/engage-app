import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { config } from '../../app/config';
import { Issue } from '../../models/issue';
/*
  Generated class for the IssueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssueProvider {

  constructor(public http: HttpClient) {
    console.log('Hello IssueProvider Provider');
  }

  getIssueList(): Observable<Issue[]>{
    const url = `${config.apiUrl}/issues`;
    return this.http.get<Issue[]>(url);

  }

  getIssue(id: String): Observable<Issue>{
    const url = `${config.apiUrl}/issues/${id}`;
    return this.http.get<Issue>(url);

  }

}
