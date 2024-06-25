import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL=`${environment.API_URL}/Images`;


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  uploadImage(file: File):Observable<any>{
    let form : FormData = new FormData()
    form.append('file', file);
    return this.http.post(`${API_URL}/upload`,form);
  }


}
