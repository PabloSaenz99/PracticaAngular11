import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

import { environment } from './../../../environments/environment';

const baseUrl = environment.url + environment.port + '/api/users'; //'http://localhost:3000/api/users'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
  get(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  login(data: any): Observable<boolean> {
    return this.http.post<boolean>(`${baseUrl}/login`, data);
  }
  logout(): Observable<any> {
    return this.http.delete(`${baseUrl}/logout`);
  }
  isLoggedIn(): Observable<string> {
    return this.http.get<string>(`${environment.url + environment.port}/api/auth/login`);
  }
  update(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/email/${email}`);
  }

  addTutorial(data: { tutorialId: string, userId: string }): Observable<any> {
    return this.http.post(`${baseUrl}/set`, data);
  }
  getUsersTutorials(): Observable<any> {
    return this.http.get(`${baseUrl}/user-tutorials`);
  }
}