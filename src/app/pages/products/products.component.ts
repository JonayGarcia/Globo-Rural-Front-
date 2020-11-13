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
  products: any = [];
  constructor(private route:ActivatedRoute, private storesService: StoresService) {
    this.showProducts();
  }

  async showProducts(){
    const name = this.route.snapshot.paramMap.get('name');
    this.shop = await this.storesService.getProductsByShop(name);
    this.shop.forEach(item=> {
      this.products.push(item.products);
    })
    console.log(this.products);
    
  }

  ngOnInit(): void {
  }

}
