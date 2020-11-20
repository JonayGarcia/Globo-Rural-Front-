import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Shop } from 'src/app/models';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
})
export class ShopsComponent implements OnInit {
  shops: Shop[] = [];

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.showShops();
  }

  async showShops() {
    const postalcode: string = this.route.snapshot.paramMap.get('postCode');
    this.shops = await this.storesService.getShopsByPostCode(postalcode);
    console.log(this.shops)
  }
}
