import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup = {} as FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.authService.resetPassword(this.emailForm.value.email).subscribe({
      next: (data) => {
        this.toastrService.success(data, "Reset Password")
        this.router.navigate(["/auth/login"])
      },
      error: (err: Error) => {
        this.toastrService.error(err.message)
      }
    })
  }
}
