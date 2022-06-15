import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { FormsModule } from '@angular/forms';

import { TutorialsListComponent } from './tutorials-list.component';

fdescribe('TutorialsListComponent', () => {
  let httpcontroller: HttpTestingController;
  let servicio: TutorialService;
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
      providers: [TutorialsListComponent, TutorialService],
      declarations: [TutorialsListComponent]
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should GET by title", () =>{
    const tutorial = [new Tutorial()];
    //tutorial = { "_id": {    "$_id": "6295d1f4cc117347b2319592"  },  "title": "Tutorial",  "description": "Tutorial 2 descripcion",  "published": false,  "__v": 0};
    servicio.findByTitle("Tutorial").subscribe(
      data => {
        console.log(data);
        expect(data).toBe(tutorial);
      },
      error => {
        console.log(error);
      });
    
    const req = httpcontroller.expectOne(`${servicio.baseUrl}?title=Tutorial`);
    expect(req.request.method).toEqual("GET");
    req.flush(tutorial);
  });

  it('should GET all tutorials', () => {
    const tutorial = [new Tutorial()];
    servicio.getAll().subscribe(
      (data) => {
        console.log(data);
        expect(data).toBe(tutorial);
        },
      error => {
        console.log(error);
      });
    
    const req = httpcontroller.expectOne(`${servicio.baseUrl}`);    
    expect(req.request.method).toEqual("GET");
    req.flush(tutorial);
  });

  it('should set first tutorial', () => {
    component.refreshList();
    component.setActiveTutorial(component.tutorials![0] , 0);
    expect(component.currentIndex).toEqual(0);
  });
});