import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseRegisterComponent } from './merchandise-register.component';

describe('MerchandiseRegisterComponent', () => {
  let component: MerchandiseRegisterComponent;
  let fixture: ComponentFixture<MerchandiseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
