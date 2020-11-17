import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { PostCodesComponent } from './pages/post-codes/post-codes.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './component/filter/filter.component';
import { FilterByCategoryComponent } from './pages/filter-by-category/filter-by-category.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ShopsComponent,
    PostCodesComponent,
    FilterComponent,
    FilterByCategoryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
