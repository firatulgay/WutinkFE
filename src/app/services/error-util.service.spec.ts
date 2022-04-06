import { TestBed } from '@angular/core/testing';

import { ErrorUtilService } from './error-util.service';

describe('ErrorUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorUtilService = TestBed.get(ErrorUtilService);
    expect(service).toBeTruthy();
  });
});
