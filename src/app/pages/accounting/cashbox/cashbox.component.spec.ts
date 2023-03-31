import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxComponent } from './cashbox.component';

describe('CashboxComponent', () => {
  let component: CashboxComponent;
  let fixture: ComponentFixture<CashboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
