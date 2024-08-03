import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.PAGES_ROUTER),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
