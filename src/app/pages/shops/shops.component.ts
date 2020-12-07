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
  isLogged: boolean = false;
  nameUser: string;
  istoogleActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.showShops();
    this.checkIfLog();
  }

  checkIfLog(){
    if(this.storesService.existToken()==true){
      const id = localStorage.getItem("idUser")
      this.storesService.getUser(id)
        .then(response=> {
          this.nameUser = response.name;
        });
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  async showShops() {
    const postalcode: string = this.route.snapshot.paramMap.get('postCode');
    console.log("Esto es lo que cojo de la url", postalcode);
    this.shops = await this.storesService.getShopsByPostCode(postalcode);
    console.log(this.shops)
  }

  logout(){
    this.storesService.clearToken();
    localStorage.removeItem("idUser")
    this.isLogged = false;
  }

  toogle(){
    if(!this.istoogleActive){
      this.istoogleActive = true;
    } else {
      this.istoogleActive = false;
    }
    console.log(this.istoogleActive)
  }
}
