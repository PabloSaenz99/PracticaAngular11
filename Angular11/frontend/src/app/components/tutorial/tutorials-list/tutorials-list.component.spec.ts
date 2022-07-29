import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';

import { Tutorial } from 'src/app/models/tutorial.model';
import { FormsModule } from '@angular/forms';

import { TutorialsListComponent } from './tutorials-list.component';
import { ToastrModule } from 'ngx-toastr';

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot({
        timeOut: 2500,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })],
      providers: [TutorialsListComponent, TutorialService],
      declarations: [TutorialsListComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set first tutorial', () => {
    component.tutorials = [];
    component.tutorials[0] = new Tutorial()
    component.refreshList();
    component.setActiveTutorial(component.tutorials![0] , 0);
    expect(component.currentIndex).toEqual(0);
  });
});