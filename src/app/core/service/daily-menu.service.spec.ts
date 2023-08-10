import { TestBed } from '@angular/core/testing';

import { DailyMenuServiceService } from './daily-menu.service';

describe('DailyMenuServiceService', () => {
  let service: DailyMenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyMenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
