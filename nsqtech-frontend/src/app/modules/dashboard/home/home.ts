import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
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
    this.user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!this.user) {
      this.router.navigate(['/']);
      return;
    }

    this.userService.getRecords(3000).subscribe(res => {

  console.log("RESPONSE:", res);

  this.records = res.filter(r =>
    r.access === this.user.role
  );

  console.log("FILTERED:", this.records);

  this.loading = false;

}, error => {
  console.error("API ERROR:", error);
  this.loading = false;
});
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}