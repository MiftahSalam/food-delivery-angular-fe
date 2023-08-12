import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canDeactivatedGuard } from 'src/app/core/guard/can-deactivated.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canDeactivate: [canDeactivatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
