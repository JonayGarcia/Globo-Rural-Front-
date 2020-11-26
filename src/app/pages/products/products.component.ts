import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Shop, Product } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public shop: Shop;
  public products: Product[] = [];
  public products2: Product[] = [];
  id: string;
  // id: number;
  category: string ="";
  categories : string[] =[];
  search: string;
  public productsIncart : Product[] = [];
  isInCart: boolean = false;
  totalToPay: number = 0;
  wantToPayF: boolean;
  productsSaved = [];
  newCartFromNewShop: {shop_id: string, products: Product[]} ={shop_id:"", products:[]};
  public productsTocart : Product[] = [];
  user:string;
  keyLogin:string;
  orderToPay: {user_id: string, shop_id: string, products: Product[], totalPrice: number };

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      //en FRONT Y EN BACK ES LA MISMA LINEA
      this.id = params.id;
      this.showProducts();
    });
    this.route.params
       .subscribe(params => {
         if(params['category']){
          this.category = params['category'];
          this.showProducts();
         }
       });
  }

  async showProducts() {
    if(this.category==""){
      this.shop = await this.storesService.getOneShop(this.id);
      this.products = await this.storesService.getProductsByShop(this.shop._id);
      // this.products = await this.storesService.getProductsByShop(this.id);
      this.showsWhosInCart(this.products)
    } else {
      this.shop = await this.storesService.getOneShop(this.id);
      this.products = await this.storesService.getProductsByShop(this.shop._id, this.category);
      // this.products = await this.storesService.getProductsByShop(this.shop.id, this.category);
      this.products2 = await this.storesService.getProductsByShop(this.shop._id);
      // this.products2 = await this.storesService.getProductsByShop(this.shop.id);
      this.showsWhosInCart(this.products)
    }
    this.getCategories();
  }

  showsWhosInCart(products){
    this.productsSaved = JSON.parse(localStorage.getItem('productsSaved')) == null ? [] : JSON.parse(localStorage.getItem('productsSaved'));
    if(this.productsSaved.some(item=> item.shop_id == this.id)){
      this.productsIncart = this.productsSaved.find(element=> element.shop_id == this.id).products;
      for (let i=0; i<this.productsIncart.length;i++){
        for (let j=0; j<products.length;j++){
          // if(products[j].id === this.productsIncart[i].id){
          if(this.products[j]._id === this.productsIncart[i]._id){
            products[j].isInCart = true;
            break
          } 
          // else{
          //   products[j].isInCart = false;
          // }
        }
      }
    } else {
      products.forEach(product=> product.isInCart=false)      
    }
    console.log(this.productsSaved)
    console.log(this.id)
    this.productsSaved.forEach(element=>{
      if(element.shop_id == this.id){
        this.productsTocart = element.products
      } 
    })
  }

  getCategories(){
    if(this.products2.length==0){
      this.products.forEach(product => {
        if(this.categories.includes(product.category) == false)
          this.categories.push(product.category);
        })
    } else {
      this.products2.forEach(product => {
        if(this.categories.includes(product.category) == false)
          this.categories.push(product.category);
        })
    }
  }

  selectCategory(category: string) {
    this.router.navigate(['../', category], {relativeTo: this.route });
 }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addToCart(product){
    product.isInCart = true;
    product.quantity = 1;
    if(this.productsSaved.some(item => item.shop_id ==product.shop_id)){
      this.productsSaved.forEach(element =>{
        if(element.shop_id==product.shop_id){
          element.products.push(product)
          this.productsTocart = element.products
        }
      })
    } else {
      this.newCartFromNewShop.shop_id = this.id;
      this.newCartFromNewShop.products.push(product)
      this.productsSaved.push(this.newCartFromNewShop);
      this.productsTocart.push(product);
    }
    localStorage.setItem('productsSaved', JSON.stringify(this.productsSaved));
  }

  removeFromCart(product){
    product.isInCart = false;
    this.productsSaved.forEach(element =>{
      if(element.shop_id==product.shop_id){
        element.products =element.products.filter(x=> x._id !=product._id);
        this.productsTocart = this.productsTocart.filter(i=> i._id != product._id);
        // element.products =element.products.filter(x=> x.id !=product.id);
        // this.productsTocart = this.productsTocart.filter(i=> i.id != product.id);
      }
    })
    localStorage.setItem('productsSaved', JSON.stringify(this.productsSaved));
  }

  showTotalToPay(total){
    this.totalToPay= total;
  }

  total(){
    if(this.productsIncart!=null){
      this.productsSaved.forEach(element =>{
        if(element.shop_id==this.id){
          this.totalToPay = +element.products.reduce((sum, prod) => sum += prod.quantity*prod.price ,0).toFixed(2);
        }
      })
    } else {
      this.totalToPay = 0;
    }
    return this.totalToPay
  }

  startPaying(data){
    this.wantToPayF = data;
  }

  signIn(){
    if(this.user==undefined || this.keyLogin == undefined){
      console.log("Parámetros inválidos");
    }else{
      this.storesService.performLogin(this.user, this.keyLogin)
      .then( data => {
        // this.isFormValid = false;
        // this.failLogin = false;
        // this.isUserLoged = true;
        this.orderToPay = {
          user_id: "1",
          shop_id: this.id,
          products: this.productsTocart,
          totalPrice: this.totalToPay
        }
        localStorage.setItem('orderToPay', JSON.stringify(this.orderToPay));
        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 3000);  //3s
      })
      .catch((error) => {
        console.log('Se ha producido el error en el front--->', error);
        // this.failLogin = true;
        // this.isFormValid = false;
        return error
      });
    }
  }

  close(){
    this.wantToPayF= false;
  }
}
