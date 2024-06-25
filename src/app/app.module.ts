import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { HomeComponent } from './guest/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewBookComponent } from './admin/new-book/new-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppstateService } from './services/appstate.service';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { BookListComponent } from './admin/book-list/book-list.component';
import { UpdateBookComponent } from './admin/update-book/update-book.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { BookOverviewComponent } from './guest/book-overview/book-overview.component';
import { HomelayoutComponent } from './guest/homelayout/homelayout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaymentComponent } from './user/payment/payment.component';
import { CartComponent } from './user/cart/cart.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PurchaseHistoriqueComponent } from './user/purchase-historique/purchase-historique.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    NavbarComponent,
    NewBookComponent,
    SideNavComponent,
    BookListComponent,
    UpdateBookComponent,
    UserListComponent,
    BookOverviewComponent,
    HomelayoutComponent,
    PaymentComponent,
    CartComponent,
    FooterComponent,
    PurchaseHistoriqueComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    FontAwesomeModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    BookService,
    AppstateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
