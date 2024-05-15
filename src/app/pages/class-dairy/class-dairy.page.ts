import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-dairy',
  templateUrl: './class-dairy.page.html',
  styleUrls: ['./class-dairy.page.scss'],
})
export class ClassDairyPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  
  routePage(routePage:string){
    if(routePage === "landingPage"){
      this.router.navigate(['tab1']);
    }
  }

}
