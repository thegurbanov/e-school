import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlayComponent } from './outlay.component';

describe('OutlayComponent', () => {
  let component: OutlayComponent;
  let fixture: ComponentFixture<OutlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
