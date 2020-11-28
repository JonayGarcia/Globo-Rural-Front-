import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {



  constructor(
    private storesService: StoresService
  ) { }

  ngOnInit(): void {
  }


}
