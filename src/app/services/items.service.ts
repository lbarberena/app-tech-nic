import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

import { Observable } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';

import { GenericResponseModel } from '../helpers/models/generic-response.model';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private url = `${environment.apiURL}/items`;
  private body: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    })
  };

  constructor( private http: HttpClient, private errorService: ErrorService ) { }

  GET(): Observable<any> {
    return this.http.get<any>( this.url )
    .pipe(
      retry( 1 ),
      catchError( this.errorService.handleError )
    );
  }

  GetByID( itemId: string ): Observable<any> {
    return this.http.get<any>(`${this.url}/${ itemId }`)
    .pipe(
      retry( 1 ),
      catchError( this.errorService.handleError )
    );
  }

  POST( data: any ): Observable<any> {
    this.body = JSON.stringify( data );

    return this.http.post<GenericResponseModel>(this.url, this.body, this.httpOptions)
    .pipe(
      retry( 1 ),
      catchError(this.errorService.handleError)
    );
  }

  PUT( itemId: string, data: any ): Observable<any> {
    this.body = JSON.stringify( data );

    return this.http.put<GenericResponseModel>(`${this.url}/${ itemId }`, this.body, this.httpOptions)
    .pipe(
      retry( 1 ),
      catchError(this.errorService.handleError)
    );
  }

  DELETE( itemId: string ): Observable<any> {
    return this.http.delete<any>(`${this.url}/${ itemId }`)
    .pipe(
      retry( 1 ),
      catchError( this.errorService.handleError )
    );
  }

}
