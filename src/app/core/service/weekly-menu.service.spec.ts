import { TestBed } from '@angular/core/testing';

import { WeeklyMenuService } from './weekly-menu.service';

describe('WeeklyMenuService', () => {
  let service: WeeklyMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
