import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../modules/record';
import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRecords(delay: number) {
    return this.http.get<Record[]>(
      `${this.API}/records?delay=${delay}`
    );
  }

  getUsers() {
    return this.http.get<User[]>(`${this.API}/users`);
  }

  addUser(user: User) {
    return this.http.post(`${this.API}/users`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API}/users/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.API}/users/${id}`, user);
  }
}