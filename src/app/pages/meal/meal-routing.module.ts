import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guard/auth.guard';
import { MealComponent } from './meal/meal.component';
import { TypesComponent } from './types/types.component';
import { adminGuard } from 'src/app/core/guard/admin.guard';

const routes: Routes = [
  { path: '', component: MealComponent, canActivate: [authGuard] },
  { path: 'type', component: TypesComponent, canActivate: [adminGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MealRoutingModule { }
