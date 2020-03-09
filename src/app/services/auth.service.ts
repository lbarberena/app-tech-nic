import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

import { Observable } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';

import { AuthResponseModel } from '../helpers/models/auth-response.model';
import { AuthModel } from '../helpers/models/auth.model';
import { GenericResponseModel } from '../helpers/models/generic-response.model';
import { RegisterModel } from '../helpers/models/register.model';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiURL}/user`;
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

  login(user: AuthModel): Observable<AuthResponseModel> {
      return this.http.post<AuthResponseModel>(`${this.url}/login`, user)
      .pipe(
        tap(
          (res: AuthResponseModel) => {
            if ( res ) {
              return res;
            }
          }
        )
      );
  }

  register(user: RegisterModel): Observable<GenericResponseModel> {
    this.body = JSON.stringify({ user });
    return this.http.post<GenericResponseModel>(`${this.url}/register`, this.body, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorService.handleError)
    );
  }

  password(user: AuthModel): Observable<GenericResponseModel> {
    return this.http.put<GenericResponseModel>(`${this.url}/password`, user).pipe(
      retry( 1 ),
      catchError( this.errorService.handleError )
    );
  }

  confirmUser( user: any ): Observable<GenericResponseModel> {
    return this.http.post<GenericResponseModel>(`${this.url}/user`, user).pipe(
      retry( 1 ),
      catchError( this.errorService.handleError )
    );
  }

}
