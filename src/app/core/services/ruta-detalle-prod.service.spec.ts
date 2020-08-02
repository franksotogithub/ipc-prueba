import { TestBed } from '@angular/core/testing';

import { RutaDetalleProdService } from './ruta-detalle-prod.service';

describe('RutaDetalleProdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RutaDetalleProdService = TestBed.get(RutaDetalleProdService);
    expect(service).toBeTruthy();
  });
});
