import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/book.model';
import { BookService } from 'src/app/services/book.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {


  selectedFile?: File;
  selectedFileName: string ="";

  BookForm!:FormGroup;
  bookId!:number;

  constructor(private bookService:BookService,private fb:FormBuilder,
    private route:ActivatedRoute, private router:Router,
    private uploadFile:UploadService
  ){
    this.BookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', [Validators.required]],
      price: [0,[Validators.required]],
      imageUrl: ['',[Validators.required]],
      releaseDate:['1925-04-10T00:00:00.000+00:00']
    });
  }

  ngOnInit(): void {
    this.bookId= this.route.snapshot.params['id'];
    this.bookService.getBook(this.bookId).subscribe(
      (data)=>{
          this.BookForm = this.fb.group({
            id:[data.id],
            title: [data.title],
            description: [data.description],
            author: [data.author],
            price: [data.price],
            imageUrl: [data.imageUrl],
          });
      },
      (error)=>{
          console.log(error);
      }
    )
  }

  selectFile(event: any) {
    this.selectedFile = event?.target.files[0];
    
    this.selectedFileName = this.selectedFile?.name || '';
  
    console.log(this.selectedFileName);
  }
  

  OnSubmit() {
    if (this.selectedFile) {
      this.uploadFile.uploadImage(this.selectedFile).subscribe(
          (data)=>{
              console.log(data)
          },
          (error)=>{
              console.log(error)
          }
      )
    }
    if(this.BookForm.valid){
      let book:Book = this.BookForm.value
      this.bookService.updateBook(book,this.bookId).subscribe(
      {
        next:data=>{
            this.router.navigateByUrl(`/admin`)
        },
        error:err=>{
          console.log(err);
        }
      }
      )
    }
    }

    handleCancel() {
      this.router.navigateByUrl(`/admin`)
    }



}
