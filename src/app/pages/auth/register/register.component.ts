import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, take, tap } from 'rxjs';
import { UserRegDTO } from 'src/app/core/model/dto/user-reg-dto';
import { BaseResponse } from 'src/app/core/model/response/base-response';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = {} as FormGroup
  errorMessage: string = ""
  registerSuccess: boolean = false
  success: string = ""
  user: UserRegDTO = {} as UserRegDTO
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private flashMessage: MatSnackBar
  ) {

  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(6)]),
      "passwordRepeat": new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = "Please enter valid data",
        this.toastrService.error(this.errorMessage, "Registration")

      return
    }

    if (this.registerForm.value.password !== this.registerForm.value.passwordRepeat) {
      this.errorMessage = "Password not match"
      this.toastrService.error(this.errorMessage, "Registration")
      return
    }

    this.loading = true;

    const userRegDTO: UserRegDTO = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password
    }

    this.authService.register(userRegDTO).pipe(
      tap(data => {
        this.errorMessage = ""
        this.registerSuccess = true
        this.registerForm.reset()
        this.success = "You need to verify your account. Please check your email"
        this.flashMessage.open(this.success, "x", { panelClass: ['snackbar-container', 'success'] })
        this.loading = false
      })
      , catchError(err => {
        console.log(err);
        this.errorMessage = err.message
        this.toastrService.error(err.message, "Registration")
        this.loading = false
        return of(err)
      })).subscribe()
  }

  canDeactivate() {
    if (!this.registerSuccess && (
      this.registerForm.value.firstName !== '' &&
      this.registerForm.value.lastName !== '' &&
      this.registerForm.value.email !== '' &&
      this.registerForm.value.password !== '' &&
      this.registerForm.value.passwordRepeat !== '')) {
      return confirm("Are you sure want to cancel registration?")
    } else {
      return true
    }
  }

  login() {
    this.router.navigate(["/auth/login"])
  }
}
