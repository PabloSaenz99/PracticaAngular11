import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { FormsModule } from '@angular/forms';

import { AddTutorialComponent } from './add-tutorial.component';

describe('AddTutorialComponent', () => {
  let httpcontroller: HttpTestingController;
  let servicio: TutorialService;
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
      providers: [AddTutorialComponent, TutorialService],
      declarations: [AddTutorialComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpcontroller = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(TutorialService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpcontroller.verify();
  });

  it("Should POST new tutorial", () =>{
    const tutorial = new Tutorial();
    servicio.create(tutorial).subscribe(
      data => {
        console.log(data);
        expect(data).toBe(tutorial);
      },
      error => {
        console.log(error);
      });
      
    const req = httpcontroller.expectOne(`${servicio.baseUrl}`);

    expect(req.request.method).toEqual("POST");
    req.flush(tutorial);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create new tutorial', () => {
    component.newTutorial();
    expect(component.tutorial).toBeTruthy()
  });
});
