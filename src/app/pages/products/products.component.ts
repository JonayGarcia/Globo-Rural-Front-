import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Shop, Product } from 'src/app/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public shop: Shop;
  public products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.showProducts();
  }

  async showProducts() {
    // const id = this.route.snapshot.paramMap.get('id'); BACKEND
    const id = +this.route.snapshot.paramMap.get('id');
    this.shop = await this.storesService.getOneShop(id);
    this.products = await this.storesService.getProductsByShop(id);
  }
}
