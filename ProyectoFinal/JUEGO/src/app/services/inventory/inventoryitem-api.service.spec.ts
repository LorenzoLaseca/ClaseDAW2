import { TestBed } from '@angular/core/testing';

import { InventoryitemApiService } from './inventoryitem-api.service';

describe('InventoryitemApiService', () => {
  let service: InventoryitemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryitemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
