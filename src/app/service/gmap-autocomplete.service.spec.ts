import { TestBed } from '@angular/core/testing';

import { GmapAutocompleteService } from './gmap-autocomplete.service';

describe('GmapAutocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmapAutocompleteService = TestBed.get(GmapAutocompleteService);
    expect(service).toBeTruthy();
  });
});
