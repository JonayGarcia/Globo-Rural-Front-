import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: {user_id: string, shop_id: string, products: Product[], totalPrice: number };
  products: Product[];

  constructor() {}

  ngOnInit(): void {
    this.showOrder();
  }

  showOrder(){
    this.order = JSON.parse(localStorage.getItem('orderToPay'))
    this.products = this.order.products;
  }

}
