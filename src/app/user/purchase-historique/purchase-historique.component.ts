import { Component, OnInit } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';
import { PurchaseHistService } from 'src/app/services/purchase-hist.service';

@Component({
  selector: 'app-purchase-historique',
  templateUrl: './purchase-historique.component.html',
  styleUrls: ['./purchase-historique.component.css']
})
export class PurchaseHistoriqueComponent implements OnInit{

  purchaseList:any=[]

  constructor(private appstate:AppstateService,
      private purchaseService:PurchaseHistService,

      
  ){}



  ngOnInit(): void {
    this.getPurchasedListByUser();
  }

  getPurchasedListByUser(){
    this.purchaseService.getUserPurchaseHist(this.appstate.AuthState.user.id).subscribe({
      next:data=>{
          this.purchaseList= data.content
          console.log(this.purchaseList);
      },
      error:err=>{
          console.log(err);
      }
    })
  }

}
