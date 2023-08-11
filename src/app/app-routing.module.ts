import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
