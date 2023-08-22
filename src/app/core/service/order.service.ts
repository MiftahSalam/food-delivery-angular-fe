import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
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
    this.httpClient.get(
      this.baseUrl + "/all",
      {
        params: { "forDay": forDay },
        observe: "response",
        responseType: 'json'
      }
    ).subscribe({
      next: (resp) => {
        const baseResponse = resp.body as BaseResponse<Order[]>
        if (baseResponse) {
          this.dataChange.next(baseResponse.data)
        } else {
          this.dataChange.next([]);
        }
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
    return this.httpClient.delete(
      this.baseUrl + `/${orderId}`,
      { observe: 'response', responseType: 'json' }
    ).pipe(
      map(resp => {
        const baseResponse = resp.body as BaseResponse<string>
        if (resp.status !== HttpStatusCode.Ok) {
          if (baseResponse) {
            throwError(() => new Error("Error occurred with error: " + baseResponse.message))
          } else {
            throwError(() => new Error("Error occurred with error: " + resp.statusText))
          }
        }

        return baseResponse.data
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message))
      })
    )
  }
}
