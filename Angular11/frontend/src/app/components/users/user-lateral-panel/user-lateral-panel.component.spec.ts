import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLateralPanelComponent } from './user-lateral-panel.component';

describe('UserLateralPanelComponent', () => {
  let component: UserLateralPanelComponent;
  let fixture: ComponentFixture<UserLateralPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLateralPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLateralPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
