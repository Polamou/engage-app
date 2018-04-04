import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';



import { config } from '../../app/config';
import { QimgResponse } from '../../models/qimg-response';

/*
  Generated class for the QimgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QimgProvider {
  private token: String;

  constructor(public http: HttpClient) {
    console.log('Hello QimgProvider Provider');
  }

  uploadImage(image: String): Observable<QimgResponse>{
    const url = `${config.qimgUrl}/images`;
    return this.http.post<any>(url,{data:image});
  }
}
