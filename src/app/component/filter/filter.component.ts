import { Component, OnInit, Input } from '@angular/core';
import {StoresService} from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  products: any = [];
  categories : string[] =[];
  shop: any = [];
  shop_id : number;
  filtered = false;
  constructor (private route:ActivatedRoute, private storesService: StoresService, public router: Router){
    this.showCategories();
  }

  async showCategories(){
    const name = this.route.snapshot.paramMap.get('name').split("-").join(" ");
    console.log(name);
    this.shop = await this.storesService.getOneShop(name);
    this.getProducts();
  }

  async getProducts(){
    this.shop.forEach(store=> {
      this.shop_id = store.id;
    })
    this.products = await this.storesService.getProductsByShop(this.shop_id);
    this.getCategories()
  }

  getCategories(){
    this.products.forEach(product => {
      if(this.categories.includes(product.category) == false)
        this.categories.push(product.category);
      })
  }

  isFiltered(){
    this.filtered=true;
    console.log(this.filtered);
  }

  ngOnInit(): void {
  }

}
