import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { ORDER_CREATE_URL, ORDER_FETCH_URL, ORDER_PAY_URL } from '../shared/utility/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL,order);
  }

  getOrder():Observable<Order>{
    return this.http.get<Order>(ORDER_FETCH_URL);
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }
}
