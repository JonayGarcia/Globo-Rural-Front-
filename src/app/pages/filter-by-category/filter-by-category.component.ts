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
  shopName: string;
  shopLogo: string;
  shop_id: number;
  shopPostCode: string;
  products: any[] = [];
  products2: any[] = [];
  category: string;
  categories : string[] =[];

  constructor(private route:ActivatedRoute, private storesService: StoresService, public router: Router) {
    // this.route.parent.params.subscribe(params => {
    //   this.nameShop = params.name.split("-").join(" ");
    //   console.log(this.nameShop)
    // });
    // this.showProducts();
  }


  async showProducts(){
    // this.route.parent.params.subscribe(params => {
    //   this.nameShop = params.name.split("-").join(" ");
    //   console.log(this.nameShop)
    // });
    this.shop = await this.storesService.getOneShop(this.nameShop);
    this.getProducts();
  }

  async getProducts(){
    this.shop.forEach( store=> {
      this.shop_id = store.id;
      this.shopPostCode = store.postCode;
      this.shopName = store.name;
      this.shopLogo = store.logo;
    })
    // this.category = this.route.snapshot.paramMap.get("category")
    this.products = await this.storesService.getProductsByShop(this.shop_id, this.category);
    console.log(this.category)
    this.products2 = await this.storesService.getProductsByShop(this.shop_id);
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
      this.nameShop = params.name.split("-").join(" ");
      console.log(this.nameShop)
    });
    this.route.params
       .subscribe(params => {
         console.log('Esto significa que cambió la categoría')
         this.category = params['category'];
         this.showProducts();
       });
  }

  selectCategory(category: string) {
    this.router.navigate(['../', category], {relativeTo: this.route });
 }

}
