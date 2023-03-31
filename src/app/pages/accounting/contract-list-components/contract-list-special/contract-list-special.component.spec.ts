import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractListSpecialComponent } from './contract-list-special.component';

describe('ContractListSpecialComponent', () => {
  let component: ContractListSpecialComponent;
  let fixture: ComponentFixture<ContractListSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractListSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
