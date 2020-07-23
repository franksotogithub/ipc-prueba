import { TestBed } from '@angular/core/testing';

import { InformanteService } from './informante.service';

describe('InformanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformanteService = TestBed.get(InformanteService);
    expect(service).toBeTruthy();
  });
});
