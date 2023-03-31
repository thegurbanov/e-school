import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialObjectSelectListComponent } from './commercial-object-select-list.component';

describe('CommercialObjectSelectListComponent', () => {
  let component: CommercialObjectSelectListComponent;
  let fixture: ComponentFixture<CommercialObjectSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialObjectSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialObjectSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
