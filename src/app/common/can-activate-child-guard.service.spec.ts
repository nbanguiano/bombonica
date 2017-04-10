import { TestBed, inject } from '@angular/core/testing';

import { CanActivateChildGuardService } from './can-activate-child-guard.service';

describe('CanActivateChildGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateChildGuardService]
    });
  });

  it('should ...', inject([CanActivateChildGuardService], (service: CanActivateChildGuardService) => {
    expect(service).toBeTruthy();
  }));
});
