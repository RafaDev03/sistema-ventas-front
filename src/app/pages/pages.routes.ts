import { Routes } from '@angular/router';

export const PAGES_ROUTER: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },

  //Mantenimientos
  {
    path: 'products',
    loadComponent: () =>
      import('./mantenimiento/product/product.component').then(
        (m) => m.ProductComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./mantenimiento/category/category.component').then(
        (m) => m.CategoryComponent
      ),
  },
  {
    path: 'providers',
    loadComponent: () =>
      import('./mantenimiento/provider/provider.component').then(
        (m) => m.ProviderComponent
      ),
  },
];
