import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { IonicStorageModule } from '@ionic/storage';

describe('CacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: CacheService = TestBed.get(CacheService);
    expect(service).toBeTruthy();
  });
});
