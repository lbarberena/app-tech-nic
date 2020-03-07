import { Injectable } from '@angular/core';
import {
  CanActivate, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivateChild, NavigationExtras,
  CanLoad, Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor( private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('auth-token');

    if ( token ) {
        return true;
    }

    // // navigate to login page
    this.router.navigate(['/authentication']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
}

canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
}

canLoad(route: Route): boolean {
    return true;
}

}
