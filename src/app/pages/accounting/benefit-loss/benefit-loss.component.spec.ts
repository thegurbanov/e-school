import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitLossComponent } from './benefit-loss.component';

describe('BenefitLossComponent', () => {
  let component: BenefitLossComponent;
  let fixture: ComponentFixture<BenefitLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitLossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
