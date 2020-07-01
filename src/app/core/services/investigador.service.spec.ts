import { TestBed } from '@angular/core/testing';

import { InvestigadorService } from './investigador.service';

describe('InvestigadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestigadorService = TestBed.get(InvestigadorService);
    expect(service).toBeTruthy();
  });
});
