import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTutorialUserComponent } from './set-tutorial-user.component';

describe('SetTutorialUser', () => {
  let component: SetTutorialUserComponent;
  let fixture: ComponentFixture<SetTutorialUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTutorialUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTutorialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
