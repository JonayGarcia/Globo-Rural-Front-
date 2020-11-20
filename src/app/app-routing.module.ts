import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostCodesComponent} from './pages/post-codes/post-codes.component';
import {ProductsComponent} from './pages/products/products.component';
import {ShopsComponent} from './pages/shops/shops.component';
import {FilterByCategoryComponent} from './pages/filter-by-category/filter-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: PostCodesComponent
  },
  { 
    path: 'postCode/:postCode',
    component: ShopsComponent,
  },
  {
    path: 'postCode/:postCode/shop/:id',
    children: [
      {
        path:'',
        component: ProductsComponent,
      },
      {
        path: ":category",
        component: ProductsComponent
        // component: FilterByCategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
