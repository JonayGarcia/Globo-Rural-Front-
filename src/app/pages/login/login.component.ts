import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string;
  keyLogin:string;

  constructor(public _location: Location) { }

  ngOnInit(): void {
  }

  signIn(){
    if(this.user==undefined || this.keyLogin == undefined){
      console.log("Parámetros inválidos");
    }else{
      console.log("Comprobación del back...");
    }
  }

  close(){

    this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }
}
