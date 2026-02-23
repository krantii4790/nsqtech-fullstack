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
  styleUrls: ['./login.css'],
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

    const credentials = {
      userId: this.userId,
      password: this.password
    };

    console.log(credentials);
    this.auth.login(credentials).subscribe({
      

      next: () => {
        this.router.navigate(['/dashboard']);
      },

      error: () => {
        this.error = 'Invalid Credentials';
      }

    });
  }
}