import { TestBed } from '@angular/core/testing';

import { MovMercadoCabService } from './mov-mercado-cab.service';

describe('MovMercadoCabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovMercadoCabService = TestBed.get(MovMercadoCabService);
    expect(service).toBeTruthy();
  });
});
