import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { adminGuard } from 'src/app/core/guard/admin.guard';

const routes: Routes = [
  { path: '', component: UsersComponent, canActivate: [adminGuard] },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
