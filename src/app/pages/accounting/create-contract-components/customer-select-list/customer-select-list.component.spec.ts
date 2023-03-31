import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectListComponent } from './customer-select-list.component';

describe('CustomerSelectListComponent', () => {
  let component: CustomerSelectListComponent;
  let fixture: ComponentFixture<CustomerSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
