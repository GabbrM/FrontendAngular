import { Component } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";
import {SignUp} from "../../models/data-model";

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {

  constructor(private admin: AdminService, private router: Router) {
  }
  showLogin = false;
  authError: string = '';
  ngOnInit(): void{
    this.admin.reloadAdmin();
  }
  signUp(data: SignUp): void{
    this.admin.userSignUp(data);
  }

  login(data: SignUp){
    this.authError="";
    //console.warn(data);
    this.admin.userLogin(data);
    this.admin.isLoginError.subscribe((isError) => {
      if (isError){
        this.authError="Email or password incorrect";
      }
    })
  }
  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
  }


}
