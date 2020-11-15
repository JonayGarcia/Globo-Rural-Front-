import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  shop: any = {};
  shopName: string;
  shopLogo: string;
  shop_id: number;
  shopPostCode: string;
  products: any[] = [];
  constructor(private route:ActivatedRoute, private storesService: StoresService) {
    this.showProducts();
  }

  async showProducts(){
    const name = this.route.snapshot.paramMap.get('name');
    this.shop = await this.storesService.getOneShop(name);
    console.log("Esto es shop--->",this.shop);
    this.getProducts();
  }

  async getProducts(){
    this.shop.forEach( store=> {
      console.log("Esto son los items con products", store.id);
      this.shop_id = store.id;
      this.shopPostCode = store.postCode;
      this.shopName = store.name;
      this.shopLogo = store.logo;
    })
    this.products = await this.storesService.getProductsByShop(this.shop_id)
    console.log("Esto es products--->",this.products);
  }



  ngOnInit(): void {
  }

}
