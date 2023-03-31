import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialObjectsComponent } from './commercial-objects.component';

describe('CommercialObjectsComponent', () => {
  let component: CommercialObjectsComponent;
  let fixture: ComponentFixture<CommercialObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
