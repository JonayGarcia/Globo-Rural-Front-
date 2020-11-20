import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-by-category',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.css']
})
export class FilterByCategoryComponent implements OnInit {
  nameShop : string;
  shop: any = {};
  // id: string; BACKEND
  id: number;
  shopLogo: string;
  shop_id: string;
  shopPostCode: string;
  products: any[] = [];
  products2: any[] = [];
  category: string;
  categories : string[] =[];

  constructor(private route:ActivatedRoute, private storesService: StoresService, public router: Router) {
  }


  async showProducts(){
    this.shop = await this.storesService.getOneShop(this.id);
    console.log(this.shop)
    this.getProducts();
  }

  async getProducts(){
    // this.products = await this.storesService.getProductsByShop(this.shop._id, this.category); BACKEND
    this.products = await this.storesService.getProductsByShop(this.shop.id, this.category);
    // this.products2 = await this.storesService.getProductsByShop(this.shop._id); BACKEND
    this.products2 = await this.storesService.getProductsByShop(this.shop.id);
    this.getCategories();
  }

  getCategories(){
    this.products2.forEach(product => {
      if(this.categories.includes(product.category) == false)
        this.categories.push(product.category);
      })
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params.id;
    });
    this.route.params
       .subscribe(params => {
         this.category = params['category'];
         this.showProducts();
       });
  }

  selectCategory(category: string) {
    this.router.navigate(['../', category], {relativeTo: this.route });
 }

}
