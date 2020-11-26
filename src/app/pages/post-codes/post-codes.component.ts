import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { Router } from '@angular/router';
import { Shop } from 'src/app/models';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-codes',
  templateUrl: './post-codes.component.html',
  styleUrls: ['./post-codes.component.css'],
})
export class PostCodesComponent implements OnInit {
  shops: Shop[] = [];
  codeFound: any = [];
  postCodes: string[] = [];
  textInput: string;
  notFound: number = 0;
  isLogged: boolean = false;
  nameUser: string;
  //numberCode: number;

  constructor(private storesService: StoresService, public router: Router) {}

  ngOnInit(): void {
    this.getShops();
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

  async getShops() {
    this.shops = await this.storesService.getAllShops();
    this.getPostCodes();
  }

  getPostCodes() {
    // SI QUIEREN TENER UNA LISTA DE CODIGOS POSTALES,
    // SE PUEDE IMPLEMENTAR EN LA API DIRECTAMENTE... comentadlo en el grupo!
    this.shops.forEach((shop: Shop) => {
      if (this.postCodes.includes(shop.postcode) == false)
        this.postCodes.push(shop.postcode);
    });
    //console.log('Mis tiendas---->', this.shops);
  }

  async findCode(postalcode: string) {
    //console.log("ESto es postalcode--->",postalcode);

    this.codeFound = await this.storesService.getShopsByPostCode(postalcode);
    //console.log("ESto es codeFound --->>", this.codeFound);
    if(this.codeFound != undefined && this.textInput != ""){
      //console.log("ESto es texInput: ",this.textInput);
      this.router.navigate(['/postCode', postalcode]);
      //console.log('El CP es---->', postalcode);
    }
    this.textInput = '';
    this.notFound=1;
  }

  logout(){
    this.storesService.clearToken();
    localStorage.removeItem("idUser")
    this.isLogged = false;
  }
}
