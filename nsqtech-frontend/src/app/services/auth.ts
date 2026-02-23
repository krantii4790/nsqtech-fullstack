import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // private apiUrl = 'http://localhost:3000/api';

  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:3000';

login(data: any) {
  return this.http.post<any>(`${this.apiUrl}/login`, data)
    .pipe(
      tap((res: any) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
      })
    );
}

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).role : null;
}

  isLoggedIn(): boolean {
  return !!localStorage.getItem('user');
}

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  private getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}