import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';
import { catchError, map, throwError } from 'rxjs';
import { BaseResponse } from '../model/response/base-response';

@Injectable({
  providedIn: 'root'
})
export class ChosenOneService {
  baseUrl = environment.baseUrl
  baseChosenOneUrl = this.baseUrl + "/chosenOne"

  constructor(private httpClient: HttpClient) { }

  getTodayOrders(forDay: string) {
    return this.httpClient.get(
      this.baseUrl + `/orders/allOrders`,
      {
        params: { "forDay": forDay },
        observe: "response",
        responseType: "json"
      }).pipe(
        map(resp => {
          const baseResponse = resp.body as BaseResponse<Order[]>
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

  setOrderPaid(order: Order) {
    return this.httpClient.post(this.baseChosenOneUrl + "/setPaid", order)
  }

  getChosenOne() {
    return this.httpClient.get(this.baseChosenOneUrl)
  }

  payNotif(userIds: number[]) {
    return this.httpClient.post(this.baseChosenOneUrl + '/payNotif', userIds)
  }
}
