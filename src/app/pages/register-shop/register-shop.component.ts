import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register-shop',
  templateUrl: './register-shop.component.html',
  styleUrls: ['./register-shop.component.css']
})
export class RegisterShopComponent implements OnInit {
  nameShop:string;
  name:string;
 // surname:string;
  email:string;
  phone:string;
  zip:string;
  key:string;
  //address:string;
  check:boolean=false;
  verify:boolean=false;

  constructor(public _location: Location) { }

  ngOnInit(): void {
  }

  checkRegister(){

    if(this.nameShop == undefined || this.name == undefined ||this.email == undefined || this.phone == undefined || this.zip == undefined
      || this.key == undefined ||  this.check == false 
      || this.nameShop == "" || this.name == "" ||this.email == "" || this.phone == "" || this.zip == ""
      || this.key == ""
      ){
   
        this.verify = true;

        console.log("Debes rellenar todos los parámetros");


   }else{
    this.verify = false;
     console.log("A la bd ...");
   }
  }

  close(){
    //location.reload();
    this._location.back();
   // this.router.navigate(['/register']);
   // console.log("---cerrar");
  }
}
