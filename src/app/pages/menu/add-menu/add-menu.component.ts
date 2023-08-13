import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { WeeklyMenu } from 'src/app/core/model/weekly-menu';
import { WeeklyMenuService } from 'src/app/core/service/weekly-menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  form: FormGroup = {} as FormGroup
  errorMessage = ""
  success = ""
  message = ""
  weeklyMenu: WeeklyMenu = {} as WeeklyMenu
  pipe = new DatePipe('en-US')
  minDate = new Date()
  minDateOut = this.pipe.transform(this.minDate, "yyyy-MM-dd")
  baseUrl = environment.baseUrl

  constructor(
    private weeklyMenuService: WeeklyMenuService,
    private router: Router,
    private flashMessage: MatSnackBar,
    private toastrService: ToastrService,
    private adapter: DateAdapter<any>
  ) {
  }
  ngOnInit(): void {
    this.adapter.setLocale('en-GB')
    this.form = new FormGroup({
      dateFrom: new FormControl(null, Validators.required),
      dateTo: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = "Please enter valida data"
      this.toastrService.error(this.errorMessage, "Add Menu")

      return
    }

    if (this.form.value.dateFrom > this.form.value.dateTo) {
      this.errorMessage = "Date from must be before date to"
      this.toastrService.error(this.errorMessage, "Add Menu")

      return
    }

    this.weeklyMenu.from = this.form.value.dateFrom
    this.weeklyMenu.to = this.form.value.dateTo

    this.weeklyMenuService.addWeeklyMenu(this.weeklyMenu).pipe(
      tap(menu => {
        this.errorMessage = ""
        this.form.reset()
        this.success = "Successfully add new weekly menu"
        this.toastrService.success(this.success, "Add Menu")
        this.router.navigate(["/menu/updateWeeklyMenu", menu.id])
      }),
      catchError(err => {
        this.errorMessage = "Menu already exists or bad input request"
        this.toastrService.error(this.errorMessage, "Add Menu")
        return of(err)
      })).subscribe()
  }

  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const mimeType = target.files[0].type
      if (mimeType.match(/image\/*/) == null) {
        this.errorMessage = "only image is supported"
        this.toastrService.error(this.errorMessage, "Add Menu")

        return
      }

      const reader = new FileReader()
      let formData = new FormData()

      reader.readAsDataURL(target.files[0])
      formData.append('file', target.files[0])

      this.weeklyMenuService.addImage(formData).subscribe(data => {
        if (data) {
          this.weeklyMenu.imagePath = this.baseUrl + "/files?imagePath=" + data
        }
      })
    }
  }
}
