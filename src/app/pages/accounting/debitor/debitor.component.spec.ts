import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitorComponent } from './debitor.component';

describe('DebitorComponent', () => {
  let component: DebitorComponent;
  let fixture: ComponentFixture<DebitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
