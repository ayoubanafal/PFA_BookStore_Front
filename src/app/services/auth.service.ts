import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/authResponse.model';
import { environment } from 'src/environments/environment.development';

const API_URL=`${environment.API_URL}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public register(registerForm:any):Observable<any>{
    return this.http.post(`${API_URL}/register`,registerForm);
  }

  public login(loginForm:any):Observable<any>{
    return this.http.post(`${API_URL}/login`,loginForm);
  }


}
