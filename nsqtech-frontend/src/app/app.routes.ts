import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./modules/auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/dashboard/home/home')
        .then(m => m.HomeComponent)
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./guards/admin-guard')
        .then(m => m.AdminGuard)
  },

  { path: '**', redirectTo: '' }
];