import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ResponseModel } from 'src/app/models/response.model';
import { CosmosDbApiService } from 'src/app/services/azure/comosDb/cosmos-db-api.service';
import { LeetcodeDialogComponent } from '../leetcode-dialog/leetcode-dialog.component';



@Component({
  selector: 'app-leetcode',
  templateUrl: './leetcode.component.html',
  styleUrls: ['./leetcode.component.scss']
})
export class LeetcodeComponent implements OnInit {



  constructor(
    private cdbApi: CosmosDbApiService,
    public dialog: MatDialog,

  ) { }

  columndefs: string[] = ['id', 'title', 'difficulty', 'toDoTime', 'nextTime', 'ok', 'function'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  items: any = {};

  //宣告_初始值_表單動作[isEdited:true(編輯)，false(新增)]
  defaultActions = {
    title: '',
    isEdited: false,
  }

  dataItem!: ResponseModel;

  actions = this.defaultActions;

  ngOnInit(): void {
    this.schedule();
    this.getData();
    // console.log(this.dataSource);
    // alert(this.dataSource[0].title);
  }

  // n = 86400000;
  // n2 = 172800000;
  n = 1000;
  n2 = 2000;
  schedule() {
    setInterval(() => {
      // this.getData();
      console.log(this.n);
      this.n = this.n2;
      this.n2 = this.n + this.n2;
    }, 900000);
  };


  //按鈕
  //新增
  creat() {
    this.actions.title = "新增";
    this.actions.isEdited = false;
    this.dialog.open(LeetcodeDialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      // alert(val.message);
      this.getData();
    });
  }

  //修改
  //內容
  edit(item: any) {
    this.actions.title = "編輯";
    this.actions.isEdited = true;
    this.dialog.open(LeetcodeDialogComponent, {
      width: '50%',
      data: item,
    }).afterClosed().subscribe(val => {
      // console.log(val);
      // alert("Update OK");
      this.getData();
    });
  }

  //刪除
  delete(id: any) {
    this.cdbApi.deleteAz("leetcode", id).subscribe({
      next: (res) => {
        alert(res.message);
        this.getData();
      },
      error: (err) => {
        alert(err?.error.message)
      }
    })
  }

  //查詢
  //全部
  getData() {
    this.cdbApi.getAz("Leetcode").subscribe({
      next: (res) => {
        // alert(res);
        // console.log(res);
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


  //下次時間
  updateNexttime(item: any) {
    this.cdbApi.putAz("leetcode", item, `/UpdateNextTime/${item.id}`).subscribe({
      next: (res) => {
        alert("題號:" + item.index + "，狀態:" + res.message);
        this.getData();
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


