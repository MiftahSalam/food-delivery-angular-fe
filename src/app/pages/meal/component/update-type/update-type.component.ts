import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Type } from 'src/app/core/model/type';
import { TypeService } from 'src/app/core/service/type.service';

@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styleUrls: ['./update-type.component.css']
})
export class UpdateTypeComponent implements OnInit {
  @Input() type = {} as Type
  form = {} as FormGroup
  errorMessage = ""
  success = ""
  closeButton = {} as HTMLButtonElement

  constructor(
    private typeService: TypeService,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      regular: new FormControl('', Validators.nullValidator),
    })
  }

  close() {
    this.form.patchValue({
      'name': this.type.name,
      'price': this.type.price,
      'regular': this.type.reguler,
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = "Please enter valid data"
      this.toastrService.error(this.errorMessage, "Update type")

      return
    }

    const type = {
      name: this.form.value.name,
      price: this.form.value.price,
      reguler: this.form.value.regular,
    } as Type

    this.typeService.updateType(type).pipe(
      tap(data => {
        this.typeService.updateSuccessEmitter.next(type)
        this.closeButton = document.getElementById("closeButtonUpdateType") as HTMLButtonElement
        this.closeButton.click()
      }),
      catchError(err => {
        this.errorMessage = "You cannot create type with same name and price"
        this.toastrService.error(this.errorMessage, "Update type")
        return err
      })
    )
  }

}
