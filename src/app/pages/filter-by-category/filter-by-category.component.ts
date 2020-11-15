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
  category: string;

  constructor(private route:ActivatedRoute, private storesService: StoresService, public router: Router) {
    // this.route.parent.params.subscribe(params => {
    //   this.nameShop = params.name.split("-").join(" ");
    //   console.log(this.nameShop)
    // });
    this.showProducts();
  }


  async showProducts(){
    this.route.parent.params.subscribe(params => {
      this.nameShop = params.name.split("-").join(" ");
      console.log(this.nameShop)
    });
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
    this.category = this.route.snapshot.paramMap.get("category")
    this.products = await this.storesService.getProductsByShop(this.shop_id, this.category)
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }

}
