import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, throwError, throwIfEmpty } from 'rxjs';
import { Book } from '../Models/book.model';

const API_URL=`${environment.API_URL}/book`;


@Injectable({providedIn: 'root'})
export class BookService {
  constructor(private httpClient: HttpClient) {
  }

  saveBook(book:Book):Observable<any>{
    return this.httpClient.post(API_URL,book);
  }

  saveBookWithImage(book: Book): Observable<any> {
    return this.httpClient.post(`${API_URL}/SaveImage`, book);
  }
  

  deleteBook(Id: number): Observable<any> {
    return this.httpClient.request('delete', `${API_URL}/${Id}`);
  }


  getAllBooks(keyword:string ,pageSize:number, currentPage:number):Observable<any>{
    return this.httpClient.get(`${API_URL}/getBooks?Search=${keyword}&size=${pageSize}&page=${currentPage}`);
  }

  updateBook(book:Book, id:number):Observable<any>{
    return this.httpClient.put(`${API_URL}/updateA/${id}`, book);
  }

  getBook(Id:number):Observable<any>{
    return this.httpClient.get(`${API_URL}/getBooks/${Id}`);
  }

  getCartBooks(userId:number):Observable<any>{
    return this.httpClient.get(`${API_URL}/Cart/${userId}`);
  }

  addBookToCart(bookId:number,userId:number):Observable<any>{
    return this.httpClient.post(`${API_URL}/addToCart/${bookId}`,userId);
  }

  deleteFromCart(bookId:number,userId:number):Observable<any>{
    return this.httpClient.delete(`${API_URL}/cart/${userId}/${bookId}`);
  }

  
}