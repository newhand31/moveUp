import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  items: any = {};
  items2: any = {};

  ngOnInit(): void {
    this.auth.getAz("videos").subscribe({
      next: (res) => {
        // alert(res);
        console.log(res);
        this.items = res;
      },
      error: (err) => {
        alert(err?.error.message)
      }
    });

  }

}
