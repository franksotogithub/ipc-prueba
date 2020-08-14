import { TestBed } from '@angular/core/testing';

import { ArticuloDirectorioService } from './articulo-directorio.service';

describe('ArticuloDirectorioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticuloDirectorioService = TestBed.get(ArticuloDirectorioService);
    expect(service).toBeTruthy();
  });
});
