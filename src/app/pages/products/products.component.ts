import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
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
  // id: string; BACKEND
  id: number;
  category: string ="";
  categories : string[] =[];
  ammount: number = 0;

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
      
      console.log(this.products)
    } else {
      this.shop = await this.storesService.getOneShop(this.id);
      console.log(this.shop)
      // this.products = await this.storesService.getProductsByShop(this.shop._id, this.category); BACKEND
      this.products = await this.storesService.getProductsByShop(this.shop.id, this.category);
      // this.products2 = await this.storesService.getProductsByShop(this.shop._id); BACKEND
      this.products2 = await this.storesService.getProductsByShop(this.shop.id);
    }
    this.getCategories();
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

  decrease(){
    if(this.ammount>=0) {
      this.ammount -=1;
    }
  }

  increase(){
    this.ammount +=1;
  }
}
