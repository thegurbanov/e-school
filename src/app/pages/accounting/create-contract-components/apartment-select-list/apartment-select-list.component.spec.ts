import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentSelectListComponent } from './apartment-select-list.component';

describe('ApartmentSelectListComponent', () => {
  let component: ApartmentSelectListComponent;
  let fixture: ComponentFixture<ApartmentSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
