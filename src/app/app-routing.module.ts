import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostCodesComponent} from './pages/post-codes/post-codes.component';
import {ProductsComponent} from './pages/products/products.component';
import {ShopsComponent} from './pages/shops/shops.component';

const routes: Routes = [
  {
    path: '',
    component: PostCodesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
