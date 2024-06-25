import { TestBed } from '@angular/core/testing';

import { SharingServiceService } from './sharing-service.service';

describe('SharingServiceService', () => {
  let service: SharingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
