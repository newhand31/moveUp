import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CosmosDbApiService } from 'src/app/services/azure/comosDb/cosmos-db-api.service';

@Component({
  selector: 'app-auto-share',
  templateUrl: './auto-share.component.html',
  styleUrls: ['./auto-share.component.scss']
})
export class AutoShareComponent implements OnInit {

  constructor(private cdbApi: CosmosDbApiService,
  ) { }

  columndefs: string[] = ['id'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  items: any = {};


  ngOnInit(): void {
    this.getData();
  }
  //查詢
  //全部
  getData() {
    this.cdbApi.getAz("Leetcode").subscribe({
      next: (res) => {
        // alert(res);
        console.log(res);
        this.items = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource.data[0].title);

      },
      error: (err) => {
        alert(err?.error.message)
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
