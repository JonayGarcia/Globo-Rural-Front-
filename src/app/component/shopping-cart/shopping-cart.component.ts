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
  productsSaved = [];
  // id: number;
  id: string;

  constructor() {}

  ngOnInit(): void {
  }

  decrease(product){
    if(product.quantity>=0) {
      product.quantity -=1;
      this.actualizeInLocalStorage(product);
    }
    if(product.quantity==0) {
      product.isInCart = false;
      this.removeProductFromCart.emit(product)
    }
  }

  total(){
    if(this.productsInCart.length!=0){
      this.totalToPay = +this.productsInCart.reduce((sum, prod) => sum += prod.quantity*prod.price ,0).toFixed(2);
    } else {
      this.totalToPay = 0;
    }
    this.totalToPayCart.emit(this.totalToPay);
    return this.totalToPay 
  }

  increase(product){
    product.quantity +=1;
    this.actualizeInLocalStorage(product);
  }

  actualizeInLocalStorage(product){
    this.productsSaved = JSON.parse(localStorage.getItem('productsSaved'));
    this.productsSaved.forEach(element =>{
      if(element.shop_id==product.shop_id){
        element.products.forEach(x=> {
          // if(x.id==product.id){
          if(x._id==product._id){ 
            x.quantity = product.quantity;
          }
        })
      }
    });
    localStorage.setItem('productsSaved', JSON.stringify(this.productsSaved));
  }

  saveOrder(){

  }

  startPayment(){
    this.wantToPay =true;
    this.sendPetitionToPay.emit(this.wantToPay);
    console.log("Esto es lo que envío:", this.wantToPay);
  }

}
