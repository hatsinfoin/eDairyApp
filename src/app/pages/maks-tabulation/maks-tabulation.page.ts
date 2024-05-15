import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maks-tabulation',
  templateUrl: './maks-tabulation.page.html',
  styleUrls: ['./maks-tabulation.page.scss'],
})
export class MaksTabulationPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }

}
