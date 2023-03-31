import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentForContractComponent } from './payment-for-contract.component';

describe('PaymentForContractComponent', () => {
  let component: PaymentForContractComponent;
  let fixture: ComponentFixture<PaymentForContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentForContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentForContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
