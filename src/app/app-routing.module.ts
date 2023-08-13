import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
  { path: 'order', loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule) },
  { path: 'meal', loadChildren: () => import('./pages/meal/meal.module').then(m => m.MealModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
