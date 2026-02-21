import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(userId: string, password: string) {
    return this.http.post(`${this.API}/login`, {
      userId,
      password
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}