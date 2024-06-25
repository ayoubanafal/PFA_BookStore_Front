import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {

  private ItemName:string='UserItem';
  constructor() { }

  setSetting(data:any){
    localStorage.setItem(this.ItemName, JSON.stringify(data));
  }

  getSetting(){
    let data= localStorage.getItem(this.ItemName);
    return JSON.parse(data!);
  }

  clearUser(){
    localStorage.removeItem(this.ItemName);
  }

  isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log(expiry * 1000)
    return expiry * 1000 > Date.now();
  }

}
