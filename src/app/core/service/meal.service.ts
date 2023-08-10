import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meal } from '../model/meal';
import { InsertMealDTO } from '../model/dto/insert-meal-dto';
import { UpdateMealDTO } from '../model/dto/update-meal-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class MealServiceService {
  baseUrl = environment.baseUrl + "/meals"
  dataChange = new BehaviorSubject<Meal[] | null>(null)
  successAddEmitter = new Subject<InsertMealDTO>()
  successUpdateEmitter = new Subject<UpdateMealDTO>()

  constructor(private httpClient: HttpClient) { }

  /**
   * getAllMeals
   */
  public getAllMeals() {
    this.httpClient.get(this.baseUrl + '/all').subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<Meal[]>

        this.dataChange.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChange.asObservable()
  }

  /**
   * addMeal
   */
  public addMeal(meal: InsertMealDTO) {
    return this.httpClient.post(this.baseUrl, meal)
  }

  /**
   * updateMeal
   */
  public updateMeal(meal: UpdateMealDTO) {
    return this.httpClient.put(this.baseUrl, meal)
  }

  /**
   * deleteMeal
   */
  public deleteMeal(id: number) {
    this.httpClient.delete(this.baseUrl + `/${id}}`).subscribe()
  }
}
