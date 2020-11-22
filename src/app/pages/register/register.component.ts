import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showBuyer:boolean = false;
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

}
