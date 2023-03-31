import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceLanguageComponent } from './interface-language.component';

describe('InterfaceLanguageComponent', () => {
  let component: InterfaceLanguageComponent;
  let fixture: ComponentFixture<InterfaceLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
