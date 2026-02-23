import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  // templateUrl: './home.html'
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  user: any;
  records: any[] = [];
  loading = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {

    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      this.router.navigate(['/']);
      return;
    }

    this.user = JSON.parse(storedUser);

    this.userService.getRecords(2000).subscribe({
      next: (res) => {

        this.records = res.filter(r =>
          r.access === this.user.role
        );

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}