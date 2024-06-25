import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {
    BookState:any={
      totalPages:0,
      totalElements:0,
      offset:0,
      number:0,
      pageSize:8,
      currentPage:0,
      keyword: "",
      BookList:[],
      status:"LOADING",
    }

    isLoading:Boolean = false;


    public LoadingOff(){
      this.isLoading=false;
    }

    public LoadingOn(){
      this.isLoading=true;
    }

    UsersState:any={
      users:[],
      totalPages:0,
      totalElements:0,
      offset:0,
      number:0,
      pageSize:8,
      currentPage:0
    }

    CartState:any={
      cartId:'',
      cartPrice:'',
    }

    AuthState:any={
      user:new User(),
      isAuthenticated:false,
    }

    public setAuthState(state:any){
      this.AuthState={...this.AuthState, ...state}
    }

    public setCartState(state:any){
      this.CartState={...this.CartState, ...state}
    }

    public setUsers(state:any){
      this.UsersState={...this.UsersState, ...state}
    }

    public setBookState(state:any){
        this.BookState = {...this.BookState, ...state}
    }


}
