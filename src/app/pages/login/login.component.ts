import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { StoresService } from 'src/app/services/stores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  keyLogin:string;
  failLogin: boolean = false;
  isUserLoged: boolean = false;

  isFormValid:boolean=false;
  isUserRegistered :boolean=false;

  constructor(
    public _location: Location,
    private storesService: StoresService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    if(this.email==undefined || this.keyLogin == undefined
      || this.email=="" || this.keyLogin == ""
      ){
      this.isFormValid = true;
      this.failLogin = false;
      
    }else{
      console.log("Entro a logearme....>");
      this.storesService.performLogin(this.email, this.keyLogin)
      .then( data => {
        this.isFormValid = false;
        this.failLogin = false;
        this.isUserLoged = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);  //3s
      })
      .catch((error) => {
        console.log('Se ha producido el error en el front--->', error);
        this.failLogin = true;
        this.isFormValid = false;
        return error
      });
    }
  }

  close(){

    this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }


  
}