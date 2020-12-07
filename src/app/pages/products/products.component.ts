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
  category: string = "";
  categories : string[] =[];
  search: string = "";
  toSearch: string = "";
  public productsIncart : Product[] = [];
  isInCart: boolean = false;
  totalToPay: number = 0;
  wantToPayF: boolean;
  productsSaved = [];
  newCartFromNewShop: {shop_id: string, products: Product[]} ={shop_id:"", products:[]};
  public productsTocart : Product[] = [];
  isLogged: boolean = false;
  nameUser: string;
  
  user:string;
  email:string;
  password:string;
  orderToPay: {user_id: string, shop_id: string, products: Product[], totalPrice: number };

  isFormValid:boolean=false;
  isUserLoged :boolean=false;
  failLogin: boolean = false;
  istoogleActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params.id;
      this.showProducts();
    });
    this.route.queryParams
       .subscribe(queryParams => {
        this.category = queryParams['category'];
        this.search = queryParams['search'];
        this.showProducts();
       });
    this.checkIfLog();
  }

  checkIfLog(){
    if(this.storesService.existToken()==true){
      const id = localStorage.getItem("idUser")
      this.storesService.getUser(id)
        .then(response=> {
          this.nameUser = response.name;
        });
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async showProducts() {
    if(typeof this.category == "undefined" && typeof this.search == "undefined" ){
      this.shop = await this.storesService.getOneShop(this.id);
      this.products = await this.storesService.getProductsByShop(this.shop._id);
      this.showsWhosInCart(this.products);
    } else {
      this.shop = await this.storesService.getOneShop(this.id);
      if(this.search=="" || this.search==null){
        this.products = await this.storesService.getProductsByShop(this.shop._id, this.category);
        this.products2 = await this.storesService.getProductsByShop(this.shop._id);
      } else if(this.category==""){
        this.products = await this.storesService.getProductsByShop(this.shop._id, this.category, this.search);
        this.products2 = await this.storesService.getProductsByShop(this.shop._id);
      } else {
        this.products = await this.storesService.getProductsByShop(this.shop._id, this.category, this.search);
        this.products2 = await this.storesService.getProductsByShop(this.shop._id);
      }
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
          if(this.products[j]._id === this.productsIncart[i]._id){
            products[j].isInCart = true;
            break
          }
        }
      }
    } else {
      products.forEach(product=> product.isInCart=false)      
    }
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

  addFilterCategory(category){
    if(typeof this.search != "undefined"){
      this.router.navigate(
        ['../'], 
        {
          relativeTo: this.route,
          queryParams: {category: category },
          queryParamsHandling: 'merge'
        });
      
    } else {
      this.router.navigate(['./products'], { relativeTo: this.route, queryParams: { category: category } });
    }
  }

  selectCategory(category: string) {
    if(typeof this.search != "undefined"){
      this.router.navigate(
        ['./'], 
        {
          relativeTo: this.route,
          queryParams: {category: category },
          queryParamsHandling: 'merge'
        });
    } else {
      this.router.navigate([this.router.url.split('?')[0]], 
      { queryParams: {category: category, search: null }, replaceUrl: true }); 
    }
 }

  goBack(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
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
    if(this.email==undefined || this.password == undefined
      || this.email=="" || this.password == ""
      ){
      this.isFormValid = true;
      this.failLogin = false;
    }else{
      this.storesService.performLogin(this.email, this.password)
      .then( data => {
        this.isFormValid = false;
        this.failLogin = false;
        this.isUserLoged = true;
        this.orderToPay = {
          user_id: localStorage.getItem("idUser"),
          shop_id: this.id,
          products: this.productsTocart,
          totalPrice: this.totalToPay
        }
        localStorage.setItem('orderToPay', JSON.stringify(this.orderToPay));
        setTimeout(() => {
          this.router.navigate(['/order']);
        }, 3000);
      })
      .catch((error) => {
        this.failLogin = true;
        this.isFormValid = false;
        return error
      });
    }
  }

  close(){
    this.wantToPayF= false;
  }

  logout(){
    this.storesService.clearToken();
    localStorage.removeItem("idUser")
    this.isLogged = false;
  }

  toogle(){
    if(!this.istoogleActive){
      this.istoogleActive = true;
    } else {
      this.istoogleActive = false;
    }
  }

  find(data){
    this.toSearch = data.replace(/[ÀÁÂÃÄÅ]/g,"A").replace(/[àáâãäå]/g,"a").replace(/[ÈÉÊË]/g,"E");
    this.toSearch = this.toSearch.replace(/[èéê]/g,"e").replace(/[ìíî]/g,"i").replace(/[ÌÍÎ]/g,"I").replace(/[ÒÓÔÖ]/g,"O");
    this.toSearch = this.toSearch.replace(/[òóôö]/g,"o").replace(/[ùúûü]/g,"u").replace(/[ÙÚÛÜ]/g,"U");
    if(typeof this.category !="undefined"){
      this.router.navigate(
        ['./'], 
        {
          relativeTo: this.route,
          queryParams: {search: this.toSearch },
          queryParamsHandling: 'merge'
        });
    } else {
      this.router.navigate([this.router.url.split('?')[0]], 
      { queryParams: {search: this.toSearch}, replaceUrl: true });
      // this.router.navigate(['./products'], { relativeTo: this.route, queryParams: { search: this.toSearch } });    
    }
  }

}
