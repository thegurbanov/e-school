import { TestBed } from '@angular/core/testing';

import { BalanceReportService } from './balance-report.service';

describe('BalanceReportService', () => {
  let service: BalanceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
