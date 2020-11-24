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
  postcode:string;
  key:string;
  //address:string;
  check:boolean=false;
  checkUserRegister:boolean=false;
  isFormValid:boolean=false;
  isUserRegistered :boolean=false;

  failRegister:boolean=false;

  constructor( public _location: Location,  public router: Router, private storesService: StoresService ) { }

  ngOnInit(): void {
  }

  checkRegister(){
    console.log("1:",this.name);
    console.log("2:",this.email);
    console.log("3:",this.phone);
    console.log("4:",this.postcode);
    console.log("5:",this.key);


    if(this.name == undefined ||this.email == undefined || this.phone == undefined || this.postcode == undefined
       || this.key == undefined ||  this.check == false ||
       this.name == "" ||this.email == "" || this.phone == "" || this.postcode == ""
       || this.key == ""
       ){
      
        this.isFormValid = true;
        this.failRegister = false;
      console.log("Debes rellenar todos los parámetros");


    }else{
        this.checkUserRegister = true;

        const newRegister = {
          name : this.name,
          email: this.email,
          phone: this.phone,
          postcode: this.postcode,
          password: this.key,
        };

        this.storesService.registerUser(newRegister) 
        .then( data => {
          this.failRegister = false;
          console.log("Esto en el register-->",data);
          localStorage.setItem('user', JSON.stringify(data));
          this.isUserRegistered = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);  //3s
        })
        .catch((error) => {
          console.log('Se ha producido el error en el front--->', error);
          this.failRegister = true;
          this.isFormValid = false;
          return error
        });;
        
            
      
   }
  }

  close(){
   // location.reload();
    this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }

  
}