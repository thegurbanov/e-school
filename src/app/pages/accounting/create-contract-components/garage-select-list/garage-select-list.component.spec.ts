import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageSelectListComponent } from './garage-select-list.component';

describe('GarageSelectListComponent', () => {
  let component: GarageSelectListComponent;
  let fixture: ComponentFixture<GarageSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
