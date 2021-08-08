import { TestBed } from '@angular/core/testing';

import { WutinkCookieService } from './wutink-cookie.service';

describe('WutinkCookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WutinkCookieService = TestBed.get(WutinkCookieService);
    expect(service).toBeTruthy();
  });
});
