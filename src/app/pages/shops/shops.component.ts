import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: any = [];
  constructor(private route:ActivatedRoute, private storesService: StoresService) {
    this.showShops();
  }

  async showShops(){
    const cp= this.route.snapshot.paramMap.get('postCode');
    this.shops= await this.storesService.getShopsByPostCode(cp);
  }

  ngOnInit(): void {
  }

}
