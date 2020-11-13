import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostCodesComponent} from './pages/post-codes/post-codes.component';
import {ProductsComponent} from './pages/products/products.component';
import {ShopsComponent} from './pages/shops/shops.component';

const routes: Routes = [
  {
    path: '',
    component: PostCodesComponent
  },
  { 
    path: 'postCode/:postCode',
    component: ShopsComponent,
    // children: [
    //   {
    //     path: 'shop/:name',
    //     component: ProductsComponent
    //   }
    // ]
  },
  {
    path: 'postCode/:postCode/shop/:name',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
