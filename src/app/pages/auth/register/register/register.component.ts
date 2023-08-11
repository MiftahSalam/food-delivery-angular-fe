import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegDTO } from 'src/app/core/model/dto/user-reg-dto';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = {} as FormGroup
  errorMessage: string = ""
  registerSuccess: boolean = false
  success: string = ""
  user: UserRegDTO = {} as UserRegDTO

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {

  }
}
