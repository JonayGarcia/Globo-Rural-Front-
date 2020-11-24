import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string;
  keyLogin:string;

  constructor(
    public _location: Location,
    private storesService: StoresService
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    if(this.user==undefined || this.keyLogin == undefined){
      console.log("Parámetros inválidos");
    }else{
      this.storesService.performLogin(this.user, this.keyLogin);
    }
  }

  close(){

    this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }
}
