import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../../models/tutorial.model';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  baseUrl = environment.url + environment.port + '/api/tutorials'; //'http://localhost:3000/api/tutorials'

  constructor(private http: HttpClient) { }
  
  findAllPublished(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.baseUrl}/published`);
  }
  findByTitle(title: string): Observable<Tutorial[]> {    
    return this.http.get<Tutorial[]>(`${this.baseUrl}/published?title=${title}`);
  }
  findById(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.baseUrl}/id?tutorialId=${id}`);
  }
  findByUser(id: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.baseUrl}/id?userId=${id}`);
  }

  create(data: Tutorial): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/id/${id}`, data);
  }
  delete(id: string): Observable<any> {    
    return this.http.delete(`${this.baseUrl}/id/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}