import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';

import { NotificationResponseModel } from '../helpers/models/notification-response.model';

import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
  })

  export class NotificationsService {
    private url = `https://onesignal.com/api/v1/notifications`;
    private body: any;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic MTc3YzkzZWMtYTJmMi00YWMxLWExNTUtZDJlMjU2ZGUwOTNj'
      })
    };

    constructor( private http: HttpClient, private errorService: ErrorService ) { }

    POST( data: any ): Observable<any> {
        this.body = JSON.stringify( data );

        return this.http.post<NotificationResponseModel>(this.url, this.body, this.httpOptions)
        .pipe(
          retry( 1 ),
          catchError(this.errorService.handleError)
        );
      }

  }
