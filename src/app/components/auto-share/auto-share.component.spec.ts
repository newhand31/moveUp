import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoShareComponent } from './auto-share.component';

describe('AutoShareComponent', () => {
  let component: AutoShareComponent;
  let fixture: ComponentFixture<AutoShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
