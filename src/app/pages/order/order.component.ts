import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductInOrder, Order, Shop } from 'src/app/models';
import { StoresService } from 'src/app/services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
  isCodeZip:boolean=false;
  isErrorStock:boolean=false;

  CPBackend:string="";
  shop:Shop;
  myShopOrder:{};
  errorMesageStock:string="";
  bufferStock= [];

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

  /*
  checkIfSamePostCode(){
    this.storesService.getOneShop(this.productsInCart.shop_id)
      .then(response =>{
        console.log("Entra a hacer la comprobación del CP");
        console.log("ESto es response",response);
        this.postCodeOfProducts = response.postcode;

      });
      
  }
  */

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

   buy(){
      //console.log("Esto es ZIPCODE-->", this.storesService.myZipCode);
      console.log("Recoger-->", localStorage.getItem('zipCode'));
      //this.getZipCode();

      if(this.delivery_address == undefined || this.postCode == undefined 
        || this.delivery_address == "" || this.postCode == ""
        ){
          //Detectar los campos completos:
          this.isFormValid = true;
          this.isBuyValid = false;
          this.isCodeZip=false;
          //console.log("Soy el hijo:", this.storesService.myZipCode);
          //@Input('zipCOde');

      }else{
        
         // this.checkIfSamePostCode();


          if(JSON.parse(localStorage.getItem('zipCode'))=== this.postCode){
                this.isFormValid = false;
                this.isBuyValid = true;
                this.isCodeZip=false;
                
                
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
                      console.log("ESTE ES LO QUE DEVUELVE EL BACKEND:", data); //solo asi, revisa si funciona 
                       this.router.navigate(['/basket']);
                  }).catch( (error) =>{
                    this.isErrorStock=true;
                    this.errorMesageStock = error.message;
                    this.bufferStock = error.insufficientStock;

                  });

                  // Estas 3 líneas ke hacen???
                  this.productsSaved = JSON.parse(localStorage.getItem("productsSaved"));
                  this.productsSaved =this.productsSaved.filter(element => element.shop_id != this.shop_id);
                  localStorage.setItem("productsSaved", JSON.stringify(this.productsSaved));
                 
                  
          }else{
            console.log(JSON.parse(localStorage.getItem('zipCode')));
            console.log("De html",this.postCode);
            this.isFormValid = false;
            this.isCodeZip=true;
            this.isBuyValid = false;
          }

      }
    }

    /*
    async getZipCode(){
     this.myShopOrder = JSON.parse(localStorage.getItem('orderToPay'));
     console.log("oooo-->", this.myShopOrder.products[0].shop_id);
     this.shop = await this.storesService.getOneShop(this.myShopOrder.products[0].shop_id);
     this.CPBackend = this.shop.postCode;
     console.log("____",this.CPBackend);
    }
    */

}
