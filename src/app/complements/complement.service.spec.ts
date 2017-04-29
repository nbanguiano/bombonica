import { TestBed, inject } from '@angular/core/testing';

import { ComplementService } from './complement.service';

describe('ComplementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplementService]
    });
  });

  it('should ...', inject([ComplementService], (service: ComplementService) => {
    expect(service).toBeTruthy();
  }));
});
