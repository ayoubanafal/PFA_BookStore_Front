import { TestBed } from '@angular/core/testing';

import { PurchaseHistService } from './purchase-hist.service';

describe('PurchaseHistService', () => {
  let service: PurchaseHistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseHistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
