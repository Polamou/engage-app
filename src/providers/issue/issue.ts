import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { config } from '../../app/config';
import { Issue } from '../../models/issue';
import { NewIssue } from '../../models/new-issue';
import { Comment } from '../../models/comment';
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

  getIssueList(page?: number, pageSize?: number, search?: string): Observable<Issue[]>{
    const url = `${config.apiUrl}/issues?include=issueType`;
    var httpParams: any = {};
    if(!page === false){httpParams.page = page.toString()};
    if(!pageSize === false){httpParams.pageSize = pageSize.toString()};
    if(!search === false){httpParams.search = search};
    const options = {"params": httpParams}
    return this.http.get<Issue[]>(url, options);

  }

  getIssue(id: String): Observable<Issue>{
    const url = `${config.apiUrl}/issues/${id}?include=issueType&include=creator`;
    return this.http.get<Issue>(url);

  }

  addIssue(issue: NewIssue): Observable<Issue>{
    const url = `${config.apiUrl}/issues`;
    return this.http.post<Issue>(url, issue);
  }

  updateIssue(id: String, params: Object): Observable<Issue>{
    const url = `${config.apiUrl}/issues/${id}`;
    return this.http.patch<Issue>(url, params);
  }

  deleteIssue(id: String): Observable<Object>{
    const url = `${config.apiUrl}/issues/${id}`;
    return this.http.delete<Object>(url);
  }

  searchIssues(searchParams: Object, page?: number, pageSize?: number, sort?: string): Observable<Issue[]>{
    const url = `${config.apiUrl}/issues/searches`;
    var httpParams: any = {};
    if(!page === false){httpParams.page = page.toString()};
    if(!pageSize === false){httpParams.pageSize = pageSize.toString()};
    if(!sort === false){httpParams.sort = sort};
    const options = {"params": httpParams}
    return this.http.post<Issue[]>(url, searchParams, options);
  }

  getIssueCommentList(issueId: String, page?: number, pageSize?: number): Observable<Comment[]>{
    const url = `${config.apiUrl}/issues/${issueId}/comments?include=author`;
    var httpParams: any = {};
    if(!page === false){httpParams.page = page.toString()};
    if(!pageSize === false){httpParams.pageSize = pageSize.toString()};
    const options = {"params": httpParams}
    return this.http.get<Comment[]>(url, options);
  }

  addComment(issueId: String, text: String): Observable<Comment>{
    var content = {"text": text}
    const url = `${config.apiUrl}/issues/${issueId}/comments`;
    return this.http.post<Comment>(url, content);

  }
}
