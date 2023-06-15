import { TestBed } from '@angular/core/testing';

import { PersonajeApiService } from './personaje-api.service';

describe('PersonajeApiService', () => {
  let service: PersonajeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonajeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
