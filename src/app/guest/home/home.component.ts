import { Component, NgModule , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book.model';
import { AppstateService } from 'src/app/services/appstate.service';
import { BookService } from 'src/app/services/book.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public books:Array<Book> =[]

  constructor(private route:Router,
    private bookService:BookService,
    public appstate:AppstateService,
    public upload:UploadService){
  }
  ngOnInit(): void {
    this.getAllbooks();
  }

  getAllbooks(){
        this.bookService.getAllBooks(this.appstate.BookState.keyword,this.appstate.BookState.pageSize, this.appstate.BookState.currentPage).subscribe(
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

  HandleNavigateToBookPage(Id:number){
      this.route.navigateByUrl(`book/${Id}`);
  }
    
  HandleSearch() {
      this.appstate.setBookState({
        keyword:this.appstate.BookState.keyword
      })
    this.getAllbooks();
  }
    
  HandlePreviousPage() {
    this.appstate.setBookState({
      currentPage : this.appstate.BookState.currentPage-1,
    })  
    this.getAllbooks();
    }
    
  HandleNextPage() {
    this.appstate.setBookState({
      currentPage : this.appstate.BookState.currentPage+1,
    })  
    this.getAllbooks();
    }


  


}
