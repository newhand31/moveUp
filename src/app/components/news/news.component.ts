import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  items: any = {};

  ngOnInit(): void {
    this.auth.getVideo().subscribe({
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
