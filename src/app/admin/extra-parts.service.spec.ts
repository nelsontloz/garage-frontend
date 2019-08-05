import { TestBed } from '@angular/core/testing';

import { ExtraPartsService } from './extra-parts.service';

describe('ExtraPartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraPartsService = TestBed.get(ExtraPartsService);
    expect(service).toBeTruthy();
  });
});
