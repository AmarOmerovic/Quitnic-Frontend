import { TestBed } from '@angular/core/testing';
import { MotivationTipService } from './motivation-tip-service.service';

describe('MotivationTipServiceService', () => {
  let service: MotivationTipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivationTipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
