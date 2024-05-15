import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-dairy',
  templateUrl: './e-dairy.page.html',
  styleUrls: ['./e-dairy.page.scss'],
})
export class EDairyPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }

}
