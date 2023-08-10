import { TestBed } from '@angular/core/testing';

import { ChosenOneService } from './chosen-one.service';

describe('ChosenOneService', () => {
  let service: ChosenOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
