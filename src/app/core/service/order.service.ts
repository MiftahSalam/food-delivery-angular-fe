import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MealDTO } from '../model/dto/meal-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl + "/orders"
  dataChange = new BehaviorSubject<string>("")

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
    return this.httpClient.get(this.baseUrl + "/all", { params: { "forDay": forDay } })
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
