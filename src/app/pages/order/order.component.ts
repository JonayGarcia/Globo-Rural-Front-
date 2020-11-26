import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: {user_id: string, shop_id: string, products: Product[], totalPrice: number };
  products: Product[];
  delivery_address: string;
  postCode: string;
  postCodeOfProducts: string;

  constructor(private storesService: StoresService,) {}

  ngOnInit(): void {
    this.showOrder();
  }

  showOrder(){
    this.order = JSON.parse(localStorage.getItem('orderToPay'))
    this.products = this.order.products;
  }

  checkIfSame(){
    this.storesService.getOneShop(this.order.shop_id)
      .then(response =>{
        this.postCodeOfProducts = response.postcode
        console.log(this.postCodeOfProducts)
      })
  }
}
