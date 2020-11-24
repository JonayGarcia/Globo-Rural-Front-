import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { StoresService } from 'src/app/services/stores.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-register-daughter',
  templateUrl: './register-daughter.component.html',
  styleUrls: ['./register-daughter.component.css']
})
export class RegisterDaughterComponent implements OnInit {

  name:string;
 // surname:string;
  email:string;
  phone:string;
  zip:string;
  key:string;
  //address:string;
  check:boolean=false;
  checkUserRegister:boolean=false;
  verify:boolean=false;

  constructor( public _location: Location,  public router: Router, private storesService: StoresService ) { }

  ngOnInit(): void {
  }

  checkRegister(){
    console.log("1:",this.name);
    console.log("2:",this.email);
    console.log("3:",this.phone);
    console.log("4:",this.zip);
    console.log("5:",this.key);


    if(this.name == undefined ||this.email == undefined || this.phone == undefined || this.zip == undefined
       || this.key == undefined ||  this.check == false ||
       this.name == "" ||this.email == "" || this.phone == "" || this.zip == ""
       || this.key == ""
       ){
      
        this.verify = true;
        
      console.log("Debes rellenar todos los parámetros");


    }else{
        this.checkUserRegister = true;

        const newRegister = {
          name : this.name,
          email: this.email,
          phone: this.phone,
          postcode: this.zip,
          password: this.key,
        };

        this.storesService.registerUser(newRegister);
        this.verify = false;
        console.log("Puedes registrarte");
    }

  }

  close(){
   // location.reload();
    this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }

  
}