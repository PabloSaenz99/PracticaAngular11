import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

import { environment } from './../../environments/environment';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = environment.url + environment.port + '/api/users'; //'http://localhost:3000/api/users'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(email: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?email=${email}`);
  }

  addTutorial(data: { tutorialId: string, userId: string }): Observable<any> {
    console.log("user-service " + data.tutorialId + " " + data.userId);
    return this.http.post(`${baseUrl}/set`, data);
  }

  getUsersTutorials(): Observable<any> {
    return this.http.get(`${baseUrl}/tutorials`);
  }
}