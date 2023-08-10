import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MealDTO } from '../model/dto/meal-dto';
import { BaseResponse } from '../model/response/base-response';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl + "/orders"
  dataChange = new BehaviorSubject<Order[]>([])

  constructor(private httpClient: HttpClient) { }

  /**
   * addOrder
   */
  public addOrder(meals: MealDTO[]) {
    return this.httpClient.post(this.baseUrl, meals)
  }

  /**
   * getOrders
   */
  public getOrders(forDay: string) {
    this.httpClient.get(this.baseUrl + "/all", { params: { "forDay": forDay } }).subscribe({
      next: (resp) => {
        const baseResponse = resp as BaseResponse<Order[]>

        this.dataChange.next(baseResponse.data)
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.name + " " + err.message);
      }
    })

    return this.dataChange.asObservable()
  }

  public getUserOrders(forDay: string) {
    return this.httpClient.get(this.baseUrl + "/allOrders", { params: { "forDay": forDay } })
  }

  /**
   * deleteOrder
   */
  public deleteOrder(orderId: number) {
    return this.httpClient.delete(this.baseUrl + `/${orderId}`)
  }
}
