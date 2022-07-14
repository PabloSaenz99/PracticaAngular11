import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { SetTutorialUserComponent } from './set-tutorial-user.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ToastInjector, ToastrModule, ToastrService } from 'ngx-toastr';

describe('SetTutorialUser', () => {
  let component: SetTutorialUserComponent;
  let fixture: ComponentFixture<SetTutorialUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()], 
      providers: [SetTutorialUserComponent, NotificationService],
      declarations: [ AppComponent, SetTutorialUserComponent ]
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

  /*
  it("should fetch data asynchronously", async () => {
    
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    let spy = spyOn(quoteService, "fetchQuotesFromServer").and.returnValue(
      Promise.resolve(fakedFetchedList)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.fetchedList).toBe(fakedFetchedList);
    });
  });
  */
});
