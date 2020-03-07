import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  // Error handling
  handleError( error ) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent ) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${ error.status }\nMessage: ${ error.message }`;
    }

    Swal.fire( 'Error', errorMessage, 'error' );
    return throwError( errorMessage );
  }
}
