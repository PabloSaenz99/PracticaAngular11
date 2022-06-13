import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

import { TutorialsListComponent } from './tutorials-list.component';

describe('TutorialsListComponent', () => {
  let httpcontroller: HttpTestingController;
  let servicio: TutorialService;
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TutorialsListComponent, TutorialService],
      declarations: [ TutorialsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpcontroller = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    servicio = TestBed.inject(TutorialService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpcontroller.verify();
  });

  it("search by title", () =>{
    const tutorial = [new Tutorial()];
    //tutorial = { "_id": {    "$oid": "6295d1f4cc117347b2319592"  },  "title": "Tutorial",  "description": "Tutorial 2 descripcion",  "published": false,  "__v": 0};
    servicio.findByTitle("Tutorial").subscribe(
      data => {
        console.log(data);
        expect(data).toBe(tutorial);
      },
      error => {
        console.log(error);
      });
      console.log();
      
    const req = httpcontroller.expectOne(`${servicio.baseUrl}?title=Tutorial`);

    expect(req.request.method).toEqual("GET");
    req.flush(tutorial);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all tutorials', () => {
    //component.retrieveTutorials();
    console.log("dsksadksad");
    servicio.testear();
    
    expect(component.tutorials).toBeDefined();
    expect(component.tutorials?.length).not.toEqual(0);
  });

  /*
  it('should set first tutorial', () => {
    component.setActiveTutorial(component.tutorials![0] , 0);
    expect(component.currentIndex).toEqual(0);
  });*/

  
});
