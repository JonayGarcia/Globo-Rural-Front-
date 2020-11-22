import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-daughter',
  templateUrl: './register-daughter.component.html',
  styleUrls: ['./register-daughter.component.css']
})
export class RegisterDaughterComponent implements OnInit {
  name:string;
  surname:string;
  email:string;
  phone:number;
  zip:number;
  key:string;
  address:string;

  constructor() { }

  ngOnInit(): void {
  }

  checkRegister(){
    console.log(this.name);
    console.log("----->><");
  }
}
