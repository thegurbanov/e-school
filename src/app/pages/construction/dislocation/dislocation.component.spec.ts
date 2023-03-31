import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislocationComponent } from './dislocation.component';

describe('DislocationComponent', () => {
  let component: DislocationComponent;
  let fixture: ComponentFixture<DislocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DislocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DislocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
