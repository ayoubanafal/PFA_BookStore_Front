import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL=`${environment.API_URL}/purchase`;

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistService {

  constructor(private http:HttpClient) { }

  savePurchaseHist(cartId:number, userId:number):Observable<any>{
    return this.http.post(`${API_URL}?cartId=${cartId}`,userId);
  }

  getUserPurchaseHist(userId:number):Observable<any>{
    return this.http.get(`${API_URL}/user/${userId}`);
  }

}
