import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from 'src/app/Models/book.model';
import { AppstateService } from 'src/app/services/appstate.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {

  public book!:Book;
  id!:number;
  
  constructor(private router:Router,
    private route:ActivatedRoute,
    private bookService:BookService,
    public appService:AppstateService ){
  }

  ngOnInit(): void {
   this.getBook();
  }

  getBook(){
    this.id=this.route.snapshot.params['id'];
    this.bookService.getBook(this.id).subscribe(
      {
        next:data=>{
          console.log(data);
          this.book=data;
        },
        error:error=>{
            console.log(error);
        }
      }
    ) 
  }

  HandleNavigateHomePage() {
    this.router.navigateByUrl(`/`);
    }

    HandleAddToCart() {
      const authState = this.appService.AuthState;
        if(authState.isAuthenticated){
          this.bookService.addBookToCart(this.book.id, authState.user.id).subscribe(
            (data) => {
              console.log(data);
              this.router.navigateByUrl(`/cart`);
            },
            (error) => {
              console.log(error);
            }
          );
        }
        else{
          this.router.navigateByUrl(`/login`);
        }
    }
    

}
