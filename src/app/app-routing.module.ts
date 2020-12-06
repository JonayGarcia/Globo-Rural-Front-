import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostCodesComponent} from './pages/post-codes/post-codes.component';
import {ProductsComponent} from './pages/products/products.component';
import {ShopsComponent} from './pages/shops/shops.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {OrderComponent} from './pages/order/order.component';
import {BasketComponent} from './pages/basket/basket.component';

const routes: Routes = [
  {
    path: '',
    component: PostCodesComponent
  },
  { 
    path: 'postCode/:postCode',
    component: ShopsComponent
  },
  {
    path: 'postCode/:postCode/shop/:id',
    children: [
      {
        path:'',
        component: ProductsComponent,
      },
      {
        path: "products",
        component: ProductsComponent
        // component: FilterByCategoryComponent
      }
    ]
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"order",
    component:OrderComponent
  },
  {
    path:"basket",
    component:BasketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
