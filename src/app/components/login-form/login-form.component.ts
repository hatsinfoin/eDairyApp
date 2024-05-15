import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  constructor( private modalCtrl: ModalController,
    private router: Router,
private navCtrl: NavController ) { }
  name:string="dd";
  ngOnInit() {}

  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  singup() {
    this.router.navigate(['signup']);
  }
 
  onForgot() {
    this.router.navigate(['forgot-password'])
  }
 
  login() {
    // this.router.navigate(['']);
    this.navCtrl.navigateRoot(['tabs']);
  }
 
  onfacebook() {
 
  }
 
  onGoogle() {
 
  }

}
