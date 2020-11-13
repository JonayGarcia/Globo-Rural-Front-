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
  products: any[] = [];
  constructor(private route:ActivatedRoute, private storesService: StoresService) {
    this.showProducts();
  }

  async showProducts(){
    const name = this.route.snapshot.paramMap.get('name');
    this.shop = await this.storesService.getProductsByShop(name);
    this.getProducts();
    console.log("Esto es shop--->",this.shop);
  }

  getProducts(){
    this.shop.forEach( store=> {
      console.log("Esto son los items con products", store.products);
      this.shopName = store.name;
      this.shopLogo = store.logo;
      this.products = store.products;
    })
    console.log("Esto es products--->",this.products);
  }



  ngOnInit(): void {
  }

}
