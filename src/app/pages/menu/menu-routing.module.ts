import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guard/auth.guard';
import { WeeklyMenuComponent } from './weekly-menu/weekly-menu.component';

const routes: Routes = [
  { path: 'weeklyMenu', component: WeeklyMenuComponent, canActivate: [authGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
