import { Injectable } from '@angular/core';
import axios from 'axios';
import { Shop, Product } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private api_url: string = 'http://localhost:3000/api';

  constructor() {}

  getAllShops(): Promise<Shop[]> {
    return axios
      .get(`${this.api_url}/shops`) // CONECTADO
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Se ha producido el error', error);
      });
  }

  getOneShop(id: string): Promise<Shop> {
    return axios
      .get(`${this.api_url}/shops/${id}`) // CONECTADO
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Se ha producido el error', error);
      });
  }

  getShopsByPostCode(postalcode: string): Promise<Shop[]> {
    return axios
      .get(`${this.api_url}/shops?postcode=${postalcode}`) // CONECTADO
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Se ha producido el error', error);
      });
  }

  getProductsByShop(shop_id: string, category?: string): Promise<Product[]> {
    if (category) {
      return axios
        .get(
          `${this.api_url}/products/shop/${shop_id}?category=${category}`// PENDIENTE DE IMPLEMENTAR EN EL BACKEND
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log('Se ha producido el error', error);
        });
    } else {
      return axios
        .get(`${this.api_url}/products/shop/${shop_id}`) // CONECTADO
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log('Se ha producido el error', error);
        });
    }
  }
}
