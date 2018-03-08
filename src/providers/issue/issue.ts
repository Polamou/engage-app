import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getIssueList(){
    const url = `${config.apiUrl}/issues`;
    return this.http.get<Issue[]>(url);

  }

}
