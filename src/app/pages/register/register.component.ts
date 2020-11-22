import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showBuyer:boolean = false;
  showClient:boolean = false;
  showdDealer:boolean = false;

  constructor() { }

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

}
