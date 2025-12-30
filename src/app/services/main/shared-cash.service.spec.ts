import { TestBed } from '@angular/core/testing';

import { SharedCashService } from './shared-cash.service';

describe('SharedCashService', () => {
  let service: SharedCashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
