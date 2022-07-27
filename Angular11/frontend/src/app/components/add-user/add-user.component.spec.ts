import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
//import { normalize } from 'path';
//https://blog.logrocket.com/angular-unit-testing-tutorial-examples/
//https://shashankvivek-7.medium.com/testing-basic-html-elements-using-karma-jasmine-in-angular-fd5e4ac62d78
//https://assist-software.net/blog/guide-unit-testing-angular-and-ngrx-using-jasmine

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  //Executed before each individual test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
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
    expect(component.today).toContain(new Date().toISOString().slice(0, 10));
  });

  it("should have not empty fields", () => {            //Check there are not empty fields when the button is clicked
    fixture.detectChanges();

    component.emailField.setValue("email@email.com");
    component.nameField.setValue("name1");

    fixture.debugElement
      .query(By.css(".btn-success"))                    //Search element by css
      .triggerEventHandler('click', null);              //Click the button
    
    expect(component.emailField.value).not.toEqual("");
    expect(component.nameField.value).not.toEqual("");
    /*
    const email = fixture.debugElement.nativeElement.querySelector("#email"); //Search element with email
    expect(email.innerHTML).not.toContain("");                                //Check its not empty
    const name = fixture.debugElement.nativeElement.querySelector("#name");
    expect(name.innerHTML).not.toContain("");
    */
  });

  it("should return 400 when empty values", () => { //Dont know how to do this 
    spyOn(component, 'saveUser').and.throwError("");
  });
});