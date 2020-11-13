import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../services/stores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-codes',
  templateUrl: './post-codes.component.html',
  styleUrls: ['./post-codes.component.css']
})
export class PostCodesComponent implements OnInit {
  shops: any = [];
  postCodes : string[] =[]
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
  }

  ngOnInit(): void {
  }

}
