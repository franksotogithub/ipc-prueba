import { TestBed } from '@angular/core/testing';

import { ProgramacionRutaService } from './programacion-ruta.service';

describe('ProgramacionRutaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramacionRutaService = TestBed.get(ProgramacionRutaService);
    expect(service).toBeTruthy();
  });
});
