import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderComponent } from './all-order.component';

describe('AllOrderComponent', () => {
  let component: AllOrderComponent;
  let fixture: ComponentFixture<AllOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllOrderComponent]
    });
    fixture = TestBed.createComponent(AllOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
