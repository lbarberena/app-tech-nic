import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  admin = false;
  role = '';

  constructor( private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.roles();
  }

  roles() {
    if ( (this.role === 'admin') || (this.role === 'CEO') ) {
      this.admin = true;
    }
  }

  accounts() {
    this.router.navigateByUrl(`/register`);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
