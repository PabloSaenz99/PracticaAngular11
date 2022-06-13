import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

import { AddTutorialComponent } from './add-tutorial.component';

describe('AddTutorialComponent', () => {
  let httpcontroller: HttpTestingController;
  let servicio: TutorialService;
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AddTutorialComponent, TutorialService],
      declarations: [ AddTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpcontroller = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("add new tutoriald", () =>{
    const tutorial = new Tutorial();
    //tutorial = { "_id": {    "$oid": "6295d1f4cc117347b2319592"  },  "title": "Tutorial",  "description": "Tutorial 2 descripcion",  "published": false,  "__v": 0};
    servicio.create(tutorial).subscribe(
      data => {
        console.log(data);
        expect(data).toBe(tutorial);
      },
      error => {
        console.log(error);
      });
      console.log();
      
    const req = httpcontroller.expectOne(`${servicio.baseUrl}`);

    expect(req.request.method).toEqual("POST");
    req.flush(tutorial);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create tutorial', () => {
    component.newTutorial();

    expect(component.tutorial).toBeTruthy()
  });
});
