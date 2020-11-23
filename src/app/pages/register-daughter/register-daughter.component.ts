import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register-daughter',
  templateUrl: './register-daughter.component.html',
  styleUrls: ['./register-daughter.component.css']
})
export class RegisterDaughterComponent implements OnInit {


  name:string;
  //surname:string;
  email:string;
  phone:string;
  zip:string;
  key:string;
  //address:string;
  check:boolean=false;

  constructor( public _location: Location,  public router: Router) { }

  ngOnInit(): void {
  }

  checkRegister(){


    if(this.name == undefined ||this.email == undefined || this.phone == undefined || this.zip == undefined
       || this.key == undefined ||  this.check == undefined){
      console.log("Debes rellenar todos los parámetros");


    }else{
      console.log("A la bd ...");
    }

  }

  close(){
    location.reload();
    //this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }
}
