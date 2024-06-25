import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book.model';
import { BookService } from 'src/app/services/book.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {


  public BookForm!:FormGroup;
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  selectedFileName: any;
  selectedFiles?: FileList;

  constructor(private route:Router,private fb:FormBuilder,
    private bookService:BookService,
    private uploadFile:UploadService){

  }

  ngOnInit(): void {
    this.BookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', [Validators.required]],
      price: [0,[Validators.required]],
      releaseDate:['1925-04-10T00:00:00.000+00:00']
    });
  }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectFiles)
  }
  


  OnSubmit() {
    let book:Book=this.BookForm.value;
    if (this.selectedFiles) {
      if (!Array.isArray(book.imageUrl)) {
        book.imageUrl = [];
          }
          for (let i = 0; i < this.selectedFiles.length; i++) {
              book.imageUrl[i] = `${environment.API_URL}/Images/files/${this.selectedFiles[i].name}`;
          }
          console.log(book.imageUrl);
            this.bookService.saveBookWithImage(book).subscribe({
              next:data=>{
                console.log(data);
                if (this.selectedFiles) {
                  for (let i = 0; i < this.selectedFiles.length; i++) {
                  this.uploadFile.uploadImage(this.selectedFiles[i]).subscribe(
                      (data)=>{
                          console.log(data)
                          
                      },
                      (error)=>{
                          console.log(error)
                      }
                  )
                }}
                this.route.navigateByUrl(`/admin`);
              },
              error:err=>{
                console.log(err);
              }
            })
            
    }
    // this.bookService.saveBook(book).subscribe({
    //   next : data=>{
    //     console.log(data);
    //   }
    // });
  }

  handleCancel() {
    this.route.navigateByUrl(`/admin`);
  }
  

}
