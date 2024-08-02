import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
