import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { PostCodesComponent } from './pages/post-codes/post-codes.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ShopsComponent,
    PostCodesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
