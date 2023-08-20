import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDTO } from 'src/app/core/model/dto/user-dto';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = {} as UserDTO
  form = {} as FormGroup
  message = ""
  enabled = false
  isEnabled = false
  baseUrl = environment.baseUrl

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue
    if (currentUser) {
      this.userService.getUser(currentUser.email).subscribe(data => {
        if (data) {
          this.user = data
        }
      })
    }

    this.form = new FormGroup({
      email: new FormControl("", Validators.email)
    })
  }

  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      let mimeType = target.files[0].type
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported"
        return
      }

      let reader = new FileReader()
      reader.readAsDataURL(target.files[0])
      let formData = new FormData()
      formData.append('file', target.files[0])

      this.userService.addImage(formData).subscribe(imageFile => {
        if (imageFile) {
          this.user.imagePath = `${this.baseUrl}/files?imagePath=${imageFile}`
          this.userService.updateUserImage(this.user.id, this.user.imagePath).subscribe({
            next: (data) => {
              this.toastr.success(data, "User Profile")
            },
            error: err => {
              this.toastr.error(err.message, "User Profile")
            }
          })
        }
      })
    }
  }
  emailChange(target: HTMLInputElement) {
    if (this.enabled) {
      this.isEnabled = true
    }

    this.enabled = true
  }

  onSubmit() {
    this.userService.updateUserEmail(this.user.id, this.user.email).subscribe({
      next: (data) => {
        this.toastr.success(data, "User Profile")
        this.authService.logout()
        this.router.navigate(["/"])
      },
      error: err => {
        this.toastr.error(err, "User Profile")
      }
    })
  }
}
