import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showBuyer:boolean = false;
  showClient:boolean = false;
  showdDealer:boolean = false;
  name: string = "";
  email: string ="";
  phone: string ="";
  postcode: string = "";
  nameInvalid: boolean = false;
  emailInvalid: boolean = false;
  numberAfterArroba: number = 0;
  thereIsnumber: boolean = false;
  phoneInvalid: boolean = false;
  thereIsconsonante: number = 0;
  postcodeInvalid: boolean = false;
  password: string= "";
  password2: string= "";
  passwordInvalid: boolean = false;
  password2Invalid: boolean = false;
  check:boolean=false;
  isFormValid:boolean=false;
  isUserRegistered :boolean=false;
  failRegister:boolean=false;
  checkUserRegister:boolean=false;


  constructor(public _location: Location,  public router: Router, private storesService: StoresService) { }

  ngOnInit(): void {
  }

  registerC(){
    this.showBuyer = true;
    /*
    let myBody = document.getElementById('registerID');
    myBody.className ="backgroundOpacity";
    console.log("Me has hecho click");
    */

  }

  registerS(){
    this.showClient = true;
  }

  registerD(){
    this.showdDealer = true;
  }

  validateName(name){
    if (name.length<3){
      this.nameInvalid = true;
    } else {
      this.nameInvalid = false;
    }
  }

  validateEmail(email){
    const afterArroba = email.slice(email.indexOf("@")+1);
    const numbersToCompare = ["0","1", "2","3", "4","5","6","7","8","9"];
    const arrayAfterArroba= Array.from(afterArroba);
    for (let i=0; i<arrayAfterArroba.length; i++){
      for(let j=0; j<numbersToCompare.length; j++){
        if(arrayAfterArroba[i]==numbersToCompare[j]){
          this.numberAfterArroba +=1;
        } 
      }
    }
    if(this.numberAfterArroba>0){
      this.thereIsnumber = true;
    } else {
      this.thereIsnumber = false
    }
    console.log(this.numberAfterArroba)
    if (email.includes("@") && email.indexOf("@")>2 && afterArroba.includes(".") && this.thereIsnumber==false ){
      this.emailInvalid = false;
    } else {  
      this.emailInvalid = true;
    }
    this.numberAfterArroba = 0;
  }

  validatePhone(phone){
    const numbersToCompare = ["0","1", "2","3", "4","5","6","7","8","9"];
    for (let i=0; i<phone.length; i++){
      for (let j=0; j<numbersToCompare.length; j++){
        if(phone[i]==numbersToCompare[j]){
          this.thereIsconsonante +=1;
          continue;
        }
      }
    }
    if(phone.length>=9 && this.thereIsconsonante==phone.length){
      this.phoneInvalid = false;
    } else {
      this.phoneInvalid =true;
    }
    this.thereIsconsonante = 0;
  }

  validatePostCode(postcode){
    const numbersToCompare = ["0","1", "2","3", "4","5","6","7","8","9"];
    for (let i=0; i<postcode.length; i++){
      for (let j=0; j<numbersToCompare.length; j++){
        if(postcode[i]==numbersToCompare[j]){
          this.thereIsconsonante +=1;
          continue;
        }
      }
    }
    if(postcode.length>=5 && this.thereIsconsonante==postcode.length){
      this.postcodeInvalid = false;
    } else {
      this.postcodeInvalid =true;
    }
    this.thereIsconsonante = 0;
  }

  validatePassword(password){
    if(password.length>=6){
      this.passwordInvalid = false;
    } else {
      this.passwordInvalid = true;
    }
  }

  validatePassword2(password2){
    if(this.password==password2){
      this.password2Invalid= false;
    } else {
      this.password2Invalid= true;
    }
  }

  close(){
     this._location.back();
  }

  checkRegister(){
    if(this.name == undefined ||this.email == undefined || this.phone == undefined || this.postcode == undefined
       || this.password == undefined ||  this.check == false ||
       this.name == "" ||this.email == "" || this.phone == "" || this.postcode == ""
       || this.password == ""
       ){
      
        this.isFormValid = true;
        this.failRegister = false;
    }else{
        this.checkUserRegister = true;
        const newRegister = {
          name : this.name,
          email: this.email,
          phone: this.phone,
          postcode: this.postcode,
          password: this.password,
        };
        this.storesService.registerUser(newRegister) 
        .then( data => {
          this.failRegister = false;
          localStorage.setItem('user', JSON.stringify(data));
          this.isUserRegistered = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);  //3s
        })
        .catch((error) => {
          this.failRegister = true;
          this.isFormValid = false;
          return error
        });;   
   }
  }
}
