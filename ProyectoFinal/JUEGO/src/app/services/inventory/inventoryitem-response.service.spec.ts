import { TestBed } from '@angular/core/testing';

import { InventoryitemResponseService } from './inventoryitem-response.service';

describe('InventoryitemResponseService', () => {
  let service: InventoryitemResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryitemResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
