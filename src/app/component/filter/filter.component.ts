import { Component, OnInit, Input } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Shop, Product } from 'src/app/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  shop: Shop;
  filtered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.showCategories();
  }

  async showCategories() {
    const id = this.route.snapshot.paramMap.get('name');
    this.shop = await this.storesService.getOneShop(id);
    this.getProducts();
  }

  async getProducts() {
    this.products = await this.storesService.getProductsByShop(this.shop._id);
    this.getCategories();
  }

  getCategories() {
    // PENDIENTE DE AÑADIR LAS CATEGORIAS EN EL BACKEND
    this.products.forEach((product) => {
      if (this.categories.includes(product.category) == false)
        this.categories.push(product.category);
    });
  }

  isFiltered() {
    this.filtered = true;
    console.log(this.filtered);
  }
}
