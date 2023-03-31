import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchRoomComponent } from './branch-room.component';

describe('BranchRoomComponent', () => {
  let component: BranchRoomComponent;
  let fixture: ComponentFixture<BranchRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
