import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalLessonComponent } from './additional-lesson.component';

describe('AdditionalLessonComponent', () => {
  let component: AdditionalLessonComponent;
  let fixture: ComponentFixture<AdditionalLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
