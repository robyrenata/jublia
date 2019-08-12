import { TestBed } from '@angular/core/testing';

import { GlobalService } from './global.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('GlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: GlobalService = TestBed.get(GlobalService);
    expect(service).toBeTruthy();
  });
});
