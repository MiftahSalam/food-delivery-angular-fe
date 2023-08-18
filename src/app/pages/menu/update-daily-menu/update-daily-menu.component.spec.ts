import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyMenuComponent } from './update-daily-menu.component';

describe('UpdateDailyMenuComponent', () => {
  let component: UpdateDailyMenuComponent;
  let fixture: ComponentFixture<UpdateDailyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDailyMenuComponent]
    });
    fixture = TestBed.createComponent(UpdateDailyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
