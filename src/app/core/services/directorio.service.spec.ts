import { TestBed } from '@angular/core/testing';

import { DirectorioService } from './directorio.service';

describe('DirectorioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectorioService = TestBed.get(DirectorioService);
    expect(service).toBeTruthy();
  });
});
