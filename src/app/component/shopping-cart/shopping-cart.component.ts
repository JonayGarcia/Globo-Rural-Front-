import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() public productsInCart: Product[];
  @Output() removeProductFromCart = new EventEmitter();
  @Output() totalToPayCart = new EventEmitter();
  @Output () sendPetitionToPay = new EventEmitter();
  totalToPay: number;
  wantToPay : boolean = false;

  constructor() {}

  ngOnInit(): void {

  }

  decrease(product){
    if(product.quantity>=0) {
      product.quantity -=1;
      localStorage.setItem('productsTocart', JSON.stringify(this.productsInCart));
    }
    if(product.quantity==0) {
      product.isInCart = false;
      this.removeProductFromCart.emit(product)
    }
    // localStorage.setItem('productsTocart', JSON.stringify(this.productsInCart));
  }

  total(){
    if(this.productsInCart!=null){
      this.totalToPay = +this.productsInCart.reduce((sum, prod) => sum += prod.quantity*prod.price ,0).toFixed(2);
    } else {
      this.totalToPay = 0;
    }
    this.totalToPayCart.emit(this.totalToPay);
    return this.totalToPay 
  }

  increase(product){
    product.quantity +=1;
    localStorage.setItem('productsTocart', JSON.stringify(this.productsInCart));
  }

  saveOrder(){

  }

  startPayment(){
    this.wantToPay =true;
    this.sendPetitionToPay.emit(this.wantToPay);
    console.log("Esto es lo que envío:", this.wantToPay);
  }

}
