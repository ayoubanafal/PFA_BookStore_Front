import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book.model';
import { AppstateService } from 'src/app/services/appstate.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public books:Array<Book> =[]
  kw: any;

  constructor(private router:Router, private bookService:BookService,public appstate:AppstateService){
  }
  ngOnInit(): void {
    this.getAllbooks();
  }

  getAllbooks(){
        this.bookService.getAllBooks("",this.appstate.BookState.pageSize, this.appstate.BookState.currentPage).subscribe(
          data=>{
            this.books=data.content
            this.appstate.setBookState({
              totalPages:data.totalPages,
              totalElements:data.totalElements,
              offset:data.pageable.offset,
              number:data.numberOfElements,
              pageSize:data.size,
              BookList:this.books,
              status:"LOADED",
            })
          },
          err=>{
              console.log(err.error);
          });        
  }


  searchBook(){
    console.log(this.kw)
    this.bookService.getAllBooks(this.kw,this.appstate.BookState.pageSize, this.appstate.BookState.currentPage).subscribe(
      data=>{
        this.books=data.content
        this.appstate.setBookState({
          totalPages:data.totalPages,
          totalElements:data.totalElements,
          offset:data.pageable.offset,
          number:data.numberOfElements,
          pageSize:data.size,
          BookList:this.books,
          status:"LOADED",
        })
      },
      err=>{
          console.log(err.error);
      });        
}


  HandlePagination(_t33: number) {
    this.appstate.setBookState({
      currentPage : _t33,
    })  
    this.getAllbooks();
    }

    HandleDeleteBook(BookId:number) {
    console.log(BookId);
     this.bookService.deleteBook(BookId).subscribe(
      data =>{
        console.log(data);
        this.getAllbooks();      
      },
     );
    }

    HandleUpdateBook(id:number) {
      this.router.navigateByUrl(`admin/update-book/${id}`);
    }

    HandleViewBookPage(id:number) {
      this.router.navigateByUrl(`book/${id}`);
    }



  
}
