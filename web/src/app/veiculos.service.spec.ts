import { TestBed, inject } from '@angular/core/testing';

import { VeiculosService } from './veiculos.service';

describe('VeiculosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VeiculosService]
    });
  });

  it('should be created', inject([VeiculosService], (service: VeiculosService) => {
    expect(service).toBeTruthy();
  }));
});
