import { TestBed } from '@angular/core/testing';

import { LoginHelper } from './login-service-singleton.service';

describe('LoginServiceSingletonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginHelper = TestBed.get(LoginHelper);
    expect(service).toBeTruthy();
  });
});
