import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { login, SignUp } from "../models/data-model";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  // Define las cabeceras con la cabecera 'ngrok-skip-browser-warning'
  private ngrokHeaders = new HttpHeaders({
    'ngrok-skip-browser-warning': '1'
  });

  constructor(private http: HttpClient, private router: Router) { }

  private addNgrokHeaders(options?: any): any {
    // Agrega las cabeceras a las opciones de solicitud (si se proporcionan)
    if (options) {
      options.headers = this.ngrokHeaders;
    } else {
      // Si no se proporcionan opciones, crea un objeto con las cabeceras
      options = { headers: this.ngrokHeaders };
    }
    return options;
  }

  userSignUp(data: SignUp): void{
    this.http
      .post('http://a06c-38-25-16-199.ngrok-free.app/admin',
        data,
        {observe: 'response', headers: this.ngrokHeaders}
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
    this.http.get(`http://a06c-38-25-16-199.ngrok-free.app/admin?email=${data.email}&password=${data.password}`,
      {observe: 'response', headers: this.ngrokHeaders}
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
