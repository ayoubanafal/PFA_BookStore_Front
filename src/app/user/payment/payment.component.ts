import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AppstateService } from 'src/app/services/appstate.service';
import { BookService } from 'src/app/services/book.service';
import { PurchaseHistService } from 'src/app/services/purchase-hist.service';
import { SharingServiceService } from 'src/app/services/sharing-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  PaymentForm!:FormGroup;

  constructor(private bookService:BookService,
    private router:ActivatedRoute,
    private fb:FormBuilder,
    private Pservice:PurchaseHistService,
    private appstate:AppstateService,
    private share:SharingServiceService,
    private routerNavigation:Router
  ){
  }
  ngOnInit(): void {
    this.PaymentForm = this.fb.group({
      CNUMBER : ['', Validators.required],
      EXPDATE : ['',Validators.required],
      CVV : ['',Validators.required],
      CHOLDER : ['',Validators.required]
    })

    try {
      let data = this.share.getSetting();
      if (!this.share.isTokenExpired(data.token)) {
        localStorage.clear();
        
      }else{
        console.log(data)
        this.appstate.setAuthState({
          user: new User(data.id,data.username,data.email,data.role),
          isAuthenticated:true,
          
        })
      }  
    } catch (error) {
      
    }
  }

  HandlePayment() {
    if(this.PaymentForm.valid){
      console.log(this.appstate.CartState.cartId);
      this.Pservice.savePurchaseHist(this.appstate.CartState.cartId, this.appstate.AuthState.user.id).subscribe({
        next: data => {
          console.log(data);
          this.routerNavigation.navigateByUrl(`/purchaseHistory`)
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

}
