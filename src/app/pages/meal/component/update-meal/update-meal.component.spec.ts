import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMealComponent } from './update-meal.component';

describe('UpdateMealComponent', () => {
  let component: UpdateMealComponent;
  let fixture: ComponentFixture<UpdateMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMealComponent]
    });
    fixture = TestBed.createComponent(UpdateMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
