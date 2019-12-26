import { TestBed } from '@angular/core/testing';

import { GpsPermissionService } from './gps-permission.service';

describe('GpsPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsPermissionService = TestBed.get(GpsPermissionService);
    expect(service).toBeTruthy();
  });
});
