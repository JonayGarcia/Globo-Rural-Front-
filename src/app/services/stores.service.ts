import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Shop, Product } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  // private api_host: string = '192.168.99.102:3000';
  private api_url: string = 'http://localhost:3000/api';
  // private api_url: string = 'http://localhost:3000';
  private token_item: string = "jwt-token";

  constructor() {
    const $this = this;
    axios.interceptors.request.use(function (config) {
      const token = $this.getStoredToken();
      if (token){
        config.headers.Authorization = token;
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

  }

  getStoredToken(): string {
    return localStorage.getItem(this.token_item);
  }

  storeToken(token: string){
    localStorage.setItem(this.token_item, token);
  }

  performLogin(email: string, password: string): Promise<boolean> {
    return axios
      .post(`${this.api_url}/user/login`, {email, password})
      .then((response) => {
        this.storeToken(response.data.token);
        return true;
      })
      .catch((error) => {
        console.log('Se ha producido el error', error);
        return false;
      });
  }

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


  registerUser(newRegister){
    return axios.post(`${this.api_url}/user`,newRegister)
    .then((response) =>{
      this.router.navigate(['/register']);
    });
  }

  loginUser(email:string, password: string){
    return axios.post(`${this.api_url}/user/login`,{email,password})
    .then((response) =>{
      this.router.navigate(['/register']);
    });
  }

}
