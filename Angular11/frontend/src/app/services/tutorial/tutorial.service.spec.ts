import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Tutorial } from '../../models/tutorial.model';

import { TutorialService } from './tutorial.service';

describe('TutorialService', () => {
  let service: TutorialService;
  let httpcontroller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TutorialService],
    });
    httpcontroller = TestBed.get(HttpTestingController);
    service = TestBed.inject(TutorialService);
  });

  afterEach(() => {
    httpcontroller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all tutorials', () => {
    const tutorial = [new Tutorial()];
    service.getAll().subscribe(
      (data) => {
        console.log(data);
        expect(data).toBe(tutorial);
        },
      error => {
        console.log(error);
      });
    
    const req = httpcontroller.expectOne(service.baseUrl);    
    expect(req.request.method).toEqual("GET");
    req.flush(tutorial);
  });

  it("Should GET by title", () =>{
    const tutorial = [new Tutorial()];
    //tutorial = { "_id": {    "$_id": "6295d1f4cc117347b2319592"  },  "title": "Tutorial",  "description": "Tutorial 2 descripcion",  "published": false,  "__v": 0};
    service.findByTitle("Tutorial").subscribe(
      data => {
        console.log(data);
        expect(data).toBe(tutorial);
      },
      error => {
        console.log(error);
      });
    
    const req = httpcontroller.expectOne(`${service.baseUrl}?title=Tutorial`);
    expect(req.request.method).toEqual("GET");
    req.flush(tutorial);
  });
});
