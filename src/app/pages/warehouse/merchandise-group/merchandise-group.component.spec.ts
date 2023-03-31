import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseGroupComponent } from './merchandise-group.component';

describe('MerchandiseGroupComponent', () => {
  let component: MerchandiseGroupComponent;
  let fixture: ComponentFixture<MerchandiseGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandiseGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
