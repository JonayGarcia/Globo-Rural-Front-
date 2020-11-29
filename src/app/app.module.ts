import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { PostCodesComponent } from './pages/post-codes/post-codes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { RegisterDaughterComponent } from './pages/register-daughter/register-daughter.component';
import { RegisterShopComponent } from './pages/register-shop/register-shop.component';
import { OrderComponent } from './pages/order/order.component';
import { BasketComponent } from './pages/basket/basket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ShopsComponent,
    PostCodesComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ShoppingCartComponent,
    RegisterDaughterComponent,
    RegisterShopComponent,
    OrderComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
