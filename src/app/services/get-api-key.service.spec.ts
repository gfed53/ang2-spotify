import { TestBed, inject } from '@angular/core/testing';

import { GetApiKeyService } from './get-api-key.service';

describe('GetApiKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetApiKeyService]
    });
  });

  it('should be created', inject([GetApiKeyService], (service: GetApiKeyService) => {
    expect(service).toBeTruthy();
  }));
});
