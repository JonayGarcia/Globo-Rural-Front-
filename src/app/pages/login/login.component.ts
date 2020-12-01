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
  password:string;
  idUSer: string;

  isFormValid:boolean=false;
  isUserLoged: boolean = false;
  failLogin: boolean = false;

  constructor(
    public _location: Location,
    private storesService: StoresService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    if(this.email==undefined || this.password == undefined
      || this.email=="" || this.password == ""
      ){
      this.isFormValid = true;
      this.failLogin = false;
      
    }else{
      console.log("Entro a logearme....>");
      this.storesService.performLogin(this.email, this.password)
      .then( data => {
        this.isFormValid = false;
        this.failLogin = false;
        this.isUserLoged = true;

        this.idUSer = data.user_id;
        localStorage.setItem('idUser', this.idUSer);
        console.log(this.storesService.existToken());
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
    //this.router.navigateByUrl('/DummyComponent');
    //this.router.navigate(["Landing"]);
    this._location.back();
   // this.router.navigate(['/register']);
    //console.log("---cerrar");
  }


  
}