import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelCreaterComponent } from './excel-creater.component';

describe('ExcelCreaterComponent', () => {
  let component: ExcelCreaterComponent;
  let fixture: ComponentFixture<ExcelCreaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelCreaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
