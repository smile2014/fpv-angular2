import { Component, OnInit } from '@angular/core';
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginState', [
      state('none', style({
        opacity: 0,
        height: '0px'
      })),
      state('clicked', style({
        opacity: 1,
        height: '260px'
      })),
      transition('none => clicked', animate('500ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  username;
  password;
  rememberMe;
  user;
  signInButtonClicked = 'none';

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.checkLoginUser()  
  }

  checkLoginUser(){
    this.loginService.getAccount().subscribe(user => this.user = user, err => console.log(err))
  }

  onSignInBtnClick() {
    this.signInButtonClicked = 'clicked';
    console.log(this.signInButtonClicked);
  }

  onSubmit(){
    this.loginService.login(this.username,this.password,this.rememberMe)
      .subscribe(
          json => {
            console.log("login success" + json)
            this.checkLoginUser()
          },
          err => {
              console.log(err);
          });
  }

  logout(){
    this.loginService.logout().subscribe(this.logResponse)
    this.user = null
  }

  logResponse(json){
    return console.log(json)
  }
}
