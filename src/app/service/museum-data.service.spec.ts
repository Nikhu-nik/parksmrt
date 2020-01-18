import { TestBed } from '@angular/core/testing';

import { MuseumDataService } from './museum-data.service';

describe('MuseumDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuseumDataService = TestBed.get(MuseumDataService);
    expect(service).toBeTruthy();
  });
});
