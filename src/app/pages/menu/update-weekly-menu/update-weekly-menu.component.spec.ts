import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeeklyMenuComponent } from './update-weekly-menu.component';

describe('UpdateWeeklyMenuComponent', () => {
  let component: UpdateWeeklyMenuComponent;
  let fixture: ComponentFixture<UpdateWeeklyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateWeeklyMenuComponent]
    });
    fixture = TestBed.createComponent(UpdateWeeklyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
