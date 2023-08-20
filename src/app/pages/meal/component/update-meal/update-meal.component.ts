import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Meal } from 'src/app/core/model/meal';
import { MealService } from 'src/app/core/service/meal.service';

@Component({
  selector: 'app-update-meal',
  templateUrl: './update-meal.component.html',
  styleUrls: ['./update-meal.component.css']
})
export class UpdateMealComponent implements OnInit {
  @Input() meal = {} as Meal
  form = {} as FormGroup
  errorMessage = ""
  success = ""
  successUpdate = ""
  closeButton = {} as HTMLButtonElement

  constructor(
    private mealService: MealService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      earlyOrder: new FormControl(''),
    })
  }

  close() {
    this.form.patchValue({
      'name': this.meal.name,
      'description': this.meal.description,
      'earlyOrder': this.meal.earlyOrder
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = "Please enter valid data"
      this.toastr.error(this.errorMessage, "Update meal")
    }

    const updateMeal = {
      id: this.meal.id,
      name: this.form.value.name,
      description: this.form.value.description,
      earlyOrder: this.form.value.earlyOrder,
    } as Meal

    this.mealService.updateMeal(updateMeal).subscribe({
      next: (data) => {
        this.mealService.successUpdateEmitter.next(updateMeal)
        this.closeButton = document.getElementById("closeButtonUpdateMeal") as HTMLButtonElement
        this.closeButton.click()
      },
      error: (err) => {
        this.errorMessage = "An error occured while updating meal"
        this.toastr.error(this.errorMessage, "Update meal")
      }
    })
  }
}
