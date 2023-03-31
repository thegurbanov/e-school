import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseTypeComponent } from './merchandise-type.component';

describe('MerchandiseTypeComponent', () => {
  let component: MerchandiseTypeComponent;
  let fixture: ComponentFixture<MerchandiseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
