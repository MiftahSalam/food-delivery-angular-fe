import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Type } from 'src/app/core/model/type';
import { TypeService } from 'src/app/core/service/type.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  typeForm = {} as FormGroup
  newType = {} as Type
  errorMessage = ""
  success = ""
  closeButton = {} as HTMLButtonElement
  displayedColumns = ["name", "price", "regular"]

  constructor(
    private typeService: TypeService,
    private toastrService: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      regular: new FormControl('', Validators.nullValidator),
    })
  }

  onSubmit() {
    if (this.typeForm.invalid) {
      this.errorMessage = "Please enter valid data"
      return
    }

    let name = this.typeForm.value.name
    if (this.typeForm.value.regular) {
      name = "Regular " + this.typeForm.value.name
    }

    let typeForInsert = {
      name: name,
      price: this.typeForm.value.price,
      reguler: this.typeForm.value.regular
    } as Type

    this.typeService.addType(typeForInsert).pipe(
      tap(data => {
        this.errorMessage = ""
        this.typeForm.reset()
        this.typeService.addSuccessEmitter.next(typeForInsert)
        this.closeButton = document.getElementById("closeAddType") as HTMLButtonElement
        this.closeButton.click()
      }),
      catchError(err => {
        this.errorMessage = "There is already a type with given name and price"
        this.toastrService.error(this.errorMessage, "Add type")
        return err
      })
    )
  }

}
