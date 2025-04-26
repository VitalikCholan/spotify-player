import { Routes } from '@angular/router';
import { CallbackComponent } from './features/auth/callback/callback.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
];
