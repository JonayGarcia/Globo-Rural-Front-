import { Injectable } from '@angular/core';
import axios from 'axios';
import { Shop, Product } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  // private api_host: string = '192.168.99.102:3000';
  private api_url: string = 'http://localhost:3000/api';
  // private api_url: string = 'http://localhost:3000'; FAKE API

  constructor() {}

  getAllShops(): Promise<Shop[]> {
    return axios
      .get(`${this.api_url}/shops`) // CONECTADO
      // .get(`${this.api_url}/shops`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Se ha producido el error', error);
      });
  }

  getOneShop(id: string): Promise<Shop> { 
  // getOneShop(id: number): Promise<Shop> {
    return axios
      .get(`${this.api_url}/shops/${id}`) // CONECTADO
      // .get(`${this.api_url}/shops/${id}`)
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
      // .get(`${this.api_url}/shops?postCode=${postalcode}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('Se ha producido el error', error);
      });
  }

  getProductsByShop(shop_id: string, category?: string): Promise<Product[]> {
  // getProductsByShop(shop_id: number, category?: string): Promise<Product[]> {
    if (category) {
      return axios
        .get(
          `${this.api_url}/products/shop/${shop_id}?category=${category}`// PENDIENTE DE IMPLEMENTAR EN EL BACKEND
          // `${this.api_url}/products?shop_id=${shop_id}&category=${category}`
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
        // .get(`${this.api_url}/products?shop_id=${shop_id}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log('Se ha producido el error', error);
        });
    }
  }
}
