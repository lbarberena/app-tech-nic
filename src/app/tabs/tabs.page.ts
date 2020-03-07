import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/authentication');
  }

}
