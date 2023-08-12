import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = {} as FormGroup
  submitted = false
  error = ""
  token: string = ""
  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    //messaging service
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    if (authService.currentUserValue) {
      router.navigate(["/"])
    }
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token']
      if (this.token) {
        this.authService.sendToken(this.token)
      }
    })
  }


  public get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      return
    }

    this.authService.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe({
      next: (user) => {
        this.router.navigate(["/"])
      },
      error: (err: HttpErrorResponse) => {
        this.error = "Please verify your account or check again email and password"
        this.toastrService.error(this.error, "Login")

        this.loading = false
        // this.submitted = false
      },
      complete: () => {
        this.loading = false
        // this.submitted = false
      }
    })
  }

  register() {
    this.router.navigate(["/auth/register"])
  }

  resetPassword() {
    this.router.navigate(["/auth/forgot-password"])
  }
}
