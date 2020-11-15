import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor() { }

  getAllShops() {
    let url = 'http://localhost:3000/shops';
    return axios.get(url)
      .then (response => {
        return response.data;
      })
      .catch (error => {
        console.log("Se ha producido el error" ,error);
      })
  }

  getOneShop(name: string){
    return axios.get('http://localhost:3000/shops?name='+name)
      .then (response => {
        return response.data;
      })
      .catch (error => {
        console.log("Se ha producido el error" ,error);
      })
  }

  getShopsByPostCode(cp:string){
    return axios.get("http://localhost:3000/shops?postCode="+cp)
      .then (response => {
        return response.data;
      })
      .catch (error => {
        console.log("Se ha producido el error" ,error);
      })
  }

  getProductsByShop(shop_id:number){
    console.log(shop_id);
    return axios.get("http://localhost:3000/products?shop_id="+shop_id)
      .then (response => {
        return response.data;
      })
      .catch (error => {
        console.log("Se ha producido el error" ,error);
      })
  }

}
