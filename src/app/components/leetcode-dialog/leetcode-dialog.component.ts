import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CosmosDbApiService } from 'src/app/services/azure/comosDb/cosmos-db-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leetcode-dialog',
  templateUrl: './leetcode-dialog.component.html',
  styleUrls: ['./leetcode-dialog.component.scss']
})
export class LeetcodeDialogComponent implements OnInit {

  leetcodeForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cdbApi: CosmosDbApiService,
    private dialogRef: MatDialogRef<LeetcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.leetcodeForm = this.fb.group({
      id: ['', Validators.required],
      index: ['', Validators.required],
      title: ['', Validators.required],
      difficulty: ['', Validators.required],
      url: ['', Validators.required],
    });

    // console.log(this.editData);
    if (this.editData) {
      this.leetcodeForm.controls['id'].setValue(this.editData.id);
      this.leetcodeForm.controls['index'].setValue(this.editData.index);
      this.leetcodeForm.controls['title'].setValue(this.editData.title);
      this.leetcodeForm.controls['difficulty'].setValue(this.editData.difficulty);
      this.leetcodeForm.controls['url'].setValue(this.editData.url);
    }
  }

  save() {
    if (!this.editData) {
      //console.log(this.leetcodeForm.value);
      if (this.leetcodeForm.valid) {

      }
      this.add()
    } else {
      this.update()
    }
  }
  add() {
    this.cdbApi.postAz('leetcode', this.leetcodeForm.value)
      .subscribe({
        next: (res) => {
          this.leetcodeForm.reset();
          this.dialogRef.close('save');
          alert("新增成功")
        },
        error: () => {
          alert("NO")
          this.dialogRef.close('save');

        }
      })
  }
  update() {
    this.cdbApi.putAz('leetcode', this.leetcodeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.leetcodeForm.reset();
          this.dialogRef.close('update');

          alert(res.message);
        },
        error: (err) => {

          alert(err.error.title);
          this.dialogRef.close('save');
        }
      })
  }
}
