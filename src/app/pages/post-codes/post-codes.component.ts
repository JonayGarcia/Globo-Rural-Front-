import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../services/stores.service';
import { Router } from '@angular/router';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-codes',
  templateUrl: './post-codes.component.html',
  styleUrls: ['./post-codes.component.css']
})
export class PostCodesComponent implements OnInit {
  shops: any = [];
  codeFound: any = [];
  postCodes : string[] =[]
  textInput : string;
  numberCode : number;
  notFound : number;

  constructor ( private storesService: StoresService, public router: Router){
    this.getShops();
  }

  async getShops (){
    this.shops = await this.storesService.getAllShops();
    this.getPostCodes();

  }

  getPostCodes(){
    this.shops.forEach(shop => {
      if(this.postCodes.includes(shop.postCode) == false)
        this.postCodes.push(shop.postCode);
      })
      console.log("Mis tiendas---->",this.shops);
  }

  async findCode(CP: string){
    this.codeFound = await this.storesService.getShopsByPostCode(CP);
    if(this.codeFound.length == 0){
      this.notFound=0;
      console.log("No se ha encontrado el CP");
    }else{
      this.notFound=1;
      this.router.navigate(['/postCode',CP]);
      console.log("El CP es---->",CP);
    }
    this.textInput="";
  }


  ngOnInit(): void {
  }

}
