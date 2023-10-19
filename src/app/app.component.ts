import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
// import { nextTick } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moveUp';

  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private router: Router) {

  }

  ngAfterViewInit(): void {
    this.sideNav.opened = false;
    this.observer.observe(['(max-width:787px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.close();
        }
      });

    //解BUG(https://youtu.be/cvdBjXsqLIQ?t=1714)
    this.cdr.detectChanges();
  }
}
