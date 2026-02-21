import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRecords(delay: number) {
    return this.http.get(`${this.apiUrl}/records?delay=${delay}`);
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  addUser(data: any) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}