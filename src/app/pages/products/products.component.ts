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
  public productsTocart : Product[] = [];
  isInCart: boolean = false;
  totalToPay: number = 0;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      console.log(params)
      //en FRONT Y EN BACK ES LA MISMA LINEA
      this.id = params.id;
      this.showProducts();
    });
    this.route.params
       .subscribe(params => {
         if(params['category']){
          this.category = params['category'];
          console.log(this.category)
          console.log("estoy filtrando por category")
          this.showProducts();
         }
       });
  }

  async showProducts() {
    if(this.category==""){
      console.log("no se esta filtrando by category");
      this.shop = await this.storesService.getOneShop(this.id);
      this.products = await this.storesService.getProductsByShop(this.id);
      this.productsTocart = JSON.parse(localStorage.getItem('productsTocart')) == null ? [] : JSON.parse(localStorage.getItem('productsTocart'));
      this.showsWhosInCart(this.products)
      console.log(this.products)
    } else {
      this.shop = await this.storesService.getOneShop(this.id);
      console.log(this.shop)
      this.products = await this.storesService.getProductsByShop(this.shop._id, this.category);
      // this.products = await this.storesService.getProductsByShop(this.shop.id, this.category);
      this.products2 = await this.storesService.getProductsByShop(this.shop._id);
      // this.products2 = await this.storesService.getProductsByShop(this.shop.id);
      this.productsTocart = JSON.parse(localStorage.getItem('productsTocart')) == null ? [] : JSON.parse(localStorage.getItem('productsTocart'));
      this.showsWhosInCart(this.products)
      console.log(this.products)
    }
    this.getCategories();
  }

  showsWhosInCart(products){
    if(this.productsTocart.length!=0){
      for (let i=0; i<this.productsTocart.length;i++){
        for (let j=0; j<products.length;j++){
          // if(products[j].id === this.productsTocart[i].id){
          if(this.products[j]._id === this.productsTocart[i]._id){
            products[j].isInCart = true;
            break
          } else{
            products[j].isInCart = false;
          }
        }
      }
    } else {
      products.forEach(product=> product.isInCart=false)
    }
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
    console.log(this.categories);
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
    this.productsTocart.push(product);
    localStorage.setItem('productsTocart', JSON.stringify(this.productsTocart));
    console.log(this.productsTocart)
  }

  removeFromCart(product){
    console.log(product);
    product.isInCart = false;
    console.log(product)
    this.productsTocart = this.productsTocart.filter(item => item.id != product.id)
    localStorage.setItem('productsTocart', JSON.stringify(this.productsTocart));
    console.log(this.productsTocart)
  }

  showTotalToPay(total){
    this.totalToPay= total;
  }

  total(){
    if(this.productsTocart!=null){
      this.totalToPay = +this.productsTocart.reduce((sum, prod) => sum += prod.quantity*prod.price ,0).toFixed(2);
    } else {
      this.totalToPay = 0;
    }
    return this.totalToPay
  }

}
