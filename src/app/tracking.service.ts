import { Injectable } from '@angular/core';
import { Jsonp, Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { TimeRecord, Localization } from './activity/model/timerecord';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class TrackingService {

  private apiUrl = 'http://localhost:9000/api/';
  private headers: Headers;
  private sessionToken: string;

  // Class constructor with Jsonp injected
  constructor(private jsonp: Jsonp, private http: Http) {
    this.headers = new Headers();
    this.createAuthorizationHeader();
  }

  getTimeRecords(count: number) {

    // End point for list of time records:
    // http://localhost:9000/api/TimeRecord/GetAll?count=10
    const endPoint = 'timerecord/GetAll'

    // URLSearchParams makes it easier to set query parameters and construct URL
    // rather than manually concatenating
    let params = new URLSearchParams();
    params.set('count', count.toString());
    //params.set('format', 'json');
    //params.set('callback', 'JSONP_CALLBACK');

    //let headers = new Headers();
    //this.createAuthorizationHeader(headers);

    // Return response
    //return this.jsonp
    return this.http
      .get(this.apiUrl + endPoint, { search: params, headers: this.headers })
      .map(this.mapTimeRecord)
      .catch(this.handleError);
    //.map(response => <string[]> response.json().data);
  }

  setTimeRecord(timeRecord) {//:Observable<TimeRecord>  {

    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.apiUrl, timeRecord, options)
      .map(response => <TimeRecord>this.toTimeRecord(response.json()))
      .catch(this.handleError);// Observable.throw(error.json().error || 'Server error'));
  }

  getTimeRecord(id: number) {

    const endPoint = 'timerecord/GetById'

    let params = new URLSearchParams();
    params.set('id', id.toString());

    return this.http
      .get(this.apiUrl + endPoint, { search: params, headers: this.headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

  authenticate(){
    const endPoint = 'authenticate';

    return this.http
      .get(this.apiUrl + endPoint, { headers: this.headers })
      .map(response => <TimeRecord>this.toTimeRecord(response.json()))
      .catch(this.handleError);
  }

  public handleError(error: any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    // We"d also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  //createAuthorizationHeader(headers:Headers) {
  private createAuthorizationHeader() {
    //this.headers.append('Authorization', 'Basic ' + btoa('user:user'));
    this.headers.append('Authorization', this.sessionToken);
    this.headers.append('Accept', 'application/json');
  }

  private mapTimeRecord = (response: Response): TimeRecord[] => {
    console.log(response.json());
    return response.json().map(r => this.toTimeRecord(r));
  }

  private toTimeRecord = (r: any): TimeRecord => {
    let timeRecord = new TimeRecord(
      r.Id,
      r.Activity,
      r.DurationStr,
      r.Username,
      r.StartLocalization ? new Localization(r.StartLocalization.Longitude, r.StartLocalization.Latitude, r.StartLocalization.CreationDate) : null,
      r.EndLocalization ? new Localization(r.EndLocalization.Longitude, r.EndLocalization.Latitude, r.EndLocalization.CreationDate) : null,
      r.IsCompleted,
      r.Start,
      r.End
    );
    console.log('Parsed timeRecord:', timeRecord);
    return timeRecord;
  }
}
