import { Component, OnInit } from '@angular/core';
import { Product, ProductInOrder, Order } from 'src/app/models';
import { StoresService } from 'src/app/services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productsInCart: {user_id: string, shop_id: string, products: Product[], totalPrice: number };
  products: Product[];
  itemInOrder: {_id:string, shop_id: string, name: string, units: number, unit_price: number, image: string};
  productsInOrder: ProductInOrder[]=[];
  productsToSendObject= {delivery_address: "", totalPrice: 0, products:[]}



  delivery_address: string;
  postCode: string;
  postCodeOfProducts: string;
  shop_id: string;
  productsSaved = [];

  isFormValid:boolean=false;
  isBuyValid:boolean=false;

  constructor(private route: ActivatedRoute,
    private storesService: StoresService,
    public router: Router) {}

  ngOnInit(): void {
    this.showOrder();
  }

  showOrder(){
    this.productsInCart = JSON.parse(localStorage.getItem('orderToPay'))
    this.products = this.productsInCart.products;
    this.shop_id = this.productsInCart.shop_id;
  }

  checkIfSame(){
    this.storesService.getOneShop(this.productsInCart.shop_id)
      .then(response =>{
        this.postCodeOfProducts = response.postcode;
        console.log(this.postCodeOfProducts);
      })
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

   buy(){

      if(this.delivery_address == undefined || this.postCode == undefined 
        || this.delivery_address == "" || this.postCode == ""
        ){

          this.isFormValid = true;
          this.isBuyValid = false;

      }else{
          this.isFormValid = false;
          this.isBuyValid = true;
          
          this.products.forEach(product=>{

            this.itemInOrder = {
              _id: product._id,
              shop_id: product.shop_id,
              name: product.name,
              units: product.quantity,
              unit_price: product.price,
              image: product.image
            };
            this.productsInOrder.push(this.itemInOrder);

            });

            this.productsToSendObject.delivery_address = this.delivery_address;
            this.productsToSendObject.totalPrice = this.productsInCart.totalPrice;
            this.productsToSendObject.products = this.productsInOrder;
            console.log("Esto es mi compra :)",this.productsToSendObject);
            
            this.storesService.postBuy(this.productsToSendObject)
            .then(data => {
                console.log("ESTE ES DATA:", data); //solo asi, revisa si funciona 
            })

            this.productsSaved = JSON.parse(localStorage.getItem("productsSaved"));
            this.productsSaved =this.productsSaved.filter(element => element.shop_id != this.shop_id);
            localStorage.setItem("productsSaved", JSON.stringify(this.productsSaved));
        
      }
}
}
