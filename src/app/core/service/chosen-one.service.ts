import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class ChosenOneService {
  baseUrl = environment.baseUrl
  baseChosenOneUrl = this.baseUrl + "/chosenOne"

  constructor(private httpClient: HttpClient) { }

  getTodayOrders(forDay: string) {
    return this.httpClient.get(this.baseUrl + `/orders/allOrders`, { params: { "forDay": forDay } })
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
