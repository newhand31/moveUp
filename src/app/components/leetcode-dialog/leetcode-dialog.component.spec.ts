import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeetcodeDialogComponent } from './leetcode-dialog.component';

describe('LeetcodeDialogComponent', () => {
  let component: LeetcodeDialogComponent;
  let fixture: ComponentFixture<LeetcodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeetcodeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeetcodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
