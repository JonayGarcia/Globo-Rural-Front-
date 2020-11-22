import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() public productsInCart: Product[] =[];
  @Output() removeProductFromCart = new EventEmitter();
  @Output() totalToPayCart = new EventEmitter();
  totalToPay: number = 0;

  constructor() {}

  ngOnInit(): void {
  }

  decrease(product){
    if(product.quantity>=0) {
      product.quantity -=1;
    }
    if(product.quantity==0) {
      this.removeProductFromCart.emit(product)
    }
  }

  total(){
    this.totalToPay = +this.productsInCart.reduce((sum, prod) => sum += prod.quantity*prod.price ,0).toFixed(2);
    this.totalToPayCart.emit(this.totalToPay);
    return +this.productsInCart.reduce((sum, prod) => sum += prod.quantity*prod.price ,0).toFixed(2) 
  }

  increase(product){
    product.quantity +=1;
  }

}
