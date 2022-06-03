import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
//import { normalize } from 'path';
//https://blog.logrocket.com/angular-unit-testing-tutorial-examples/
//https://shashankvivek-7.medium.com/testing-basic-html-elements-using-karma-jasmine-in-angular-fd5e4ac62d78

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  //Executed before each individual test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AddUserComponent],
      declarations: [ AddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;                //creates an instance of the class 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();                       //check if the instance is truly created or not
  });

  it("should have todays date", () => {
    fixture.detectChanges();
    expect(component.today).toContain("2022-06-03");
  });

  it("should have not empty fields", () => {            //Check there are not empty fields when the button is clicked
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css(".btn-success"))                    //Search element by css
      .triggerEventHandler('click', null);              //Click the button
    const email = fixture.debugElement.nativeElement.querySelector("#email"); //Search element with email
    expect(email.innerHTML).not.toContain("");                                //Check its not empty
    const name = fixture.debugElement.nativeElement.querySelector("#name");
    expect(name.innerHTML).not.toContain("");
  });
});
