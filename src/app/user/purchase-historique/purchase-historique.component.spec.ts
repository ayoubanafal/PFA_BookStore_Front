import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoriqueComponent } from './purchase-historique.component';

describe('PurchaseHistoriqueComponent', () => {
  let component: PurchaseHistoriqueComponent;
  let fixture: ComponentFixture<PurchaseHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
