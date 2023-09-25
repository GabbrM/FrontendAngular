import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {login, SignUp} from "../models/data-model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp): void{
    this.http
      .post('http://localhost:3000/admin',
      data,
      {observe: 'response'}
    ).subscribe((result) => {
      this.isAdminLoggedIn.next(true);
      localStorage.setItem('admin', JSON.stringify(result.body));
      this.router.navigate(['admin-home']);
    });
  }
  reloadAdmin(): void{
    if (localStorage.getItem('admin')){
      this.isAdminLoggedIn.next(true);
      this.router.navigate(['admin-home']);

    }
  }

  userLogin(data: login){
    console.warn(data);
    this.http.get(`http://localhost:3000/admin?email=${data.email}&password=${data.password}`,
      {observe: 'response'}
    ).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length){
        console.warn("user logged in");
        localStorage.setItem('admin', JSON.stringify(result.body));
        this.router.navigate(['admin-home']);
      }else {
        console.warn("login failed");
        this.isLoginError.emit(true);
      }
    })
  }
}
