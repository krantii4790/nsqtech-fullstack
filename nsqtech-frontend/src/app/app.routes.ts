import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login';
import { HomeComponent } from './modules/dashboard/home/home';
import { UserManagementComponent } from './modules/admin/user-management/user-management';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  { path: '', component: LoginComponent },

  { 
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  { 
    path: 'admin',
    component: UserManagementComponent,
    canActivate: [authGuard, adminGuard]
  },

  { path: '**', redirectTo: '' }

];