import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  userId: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
  this.auth.login(this.userId, this.password)
    .subscribe((res: any) => {

      if (res.status === 'success') {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      }

    }, () => {
      alert('Invalid Credentials');
    });
}
}