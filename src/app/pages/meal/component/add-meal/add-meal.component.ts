import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { InsertMealDTO } from 'src/app/core/model/dto/insert-meal-dto';
import { Type } from 'src/app/core/model/type';
import { MealService } from 'src/app/core/service/meal.service';
import { TypeService } from 'src/app/core/service/type.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  form = {} as FormGroup
  types = [] as Type[]
  showPrice = false
  isRegular = true
  earlyOrder = false
  errorMessage = ""
  success = ""
  currentType = {} as Type
  price = 0
  typesEmpty = true
  length = 0
  closeButton = {} as HTMLButtonElement
  regularTypes = [] as Type[]

  constructor(
    private typeService: TypeService,
    private mealService: MealService,
    private flashMessage: MatSnackBar,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      earlyOrder: new FormControl(false),
      nameType: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
    })

    this.getTypes()
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = "Please enter valid data"
      this.toastrService.error(this.errorMessage, "Add meal")

      return
    }

    if (!this.isRegular && (this.form.value.price <= 0)) {
      this.errorMessage = "Please enter price"
      this.toastrService.error(this.errorMessage, "Add meal")

      return
    }

    if (this.isRegular) {
      this.price = 0
    } else {
      this.price = this.form.value.price
    }

    this.earlyOrder = this.form.value.earlyOrder

    let insertMeal = {} as InsertMealDTO
    insertMeal.name = this.form.value.name
    insertMeal.description = this.form.value.description
    insertMeal.earlyOrder = this.form.value.earlyOrder

    if (this.currentType.name === "regular") {
      insertMeal.isReguler = true
      insertMeal.types = this.regularTypes
    } else {
      insertMeal.isReguler = false
      insertMeal.types = [this.currentType]
    }

    this.mealService.addMeal(insertMeal).subscribe({
      next: (data) => {
        this.form.reset()
        this.showPrice = false
        this.isRegular = true
        this.mealService.successAddEmitter.next(insertMeal)
        this.closeButton = document.getElementById("closeButtonAddMeal") as HTMLButtonElement
        this.closeButton.click()

      },
      error: (err) => {
        this.errorMessage = "An error occured while creating meal"
        this.toastrService.error(this.errorMessage, "Add meal")
      }
    })
  }

  getTypes() {
    this.typeService.getAllType().subscribe(data => {
      if (data && data.length > 0) {
        this.types = data
        this.typesEmpty = false
        this.regularTypes = this.types.filter(type => type.reguler)
        this.types = this.types.filter(type => !type.reguler)
        this.length = this.types.push({ name: "regular", price: 1, reguler: true } as Type)

        this.form.patchValue({
          'nameType': this.types[this.length - 1]
        })

        this.currentType = this.types[this.length - 1]
        this.onChange(this.currentType)
      }
    })
  }

  onChange(currentType: Type) {
    if (this.form.value.nameType.name != 'regular') {
      this.showPrice = true
      this.isRegular = false
    } else {
      this.showPrice = false
      this.isRegular = true
    }
  }

}
