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

  // Reemplaza esta URL por la URL de Ngrok
  private apiUrl = 'https://b047-38-25-16-199.ngrok-free.app'; // URL de Ngrok

  constructor(private http: HttpClient, private router: Router) { }

  // Agrega un encabezado personalizado para omitir la advertencia de Ngrok
  private ngrokHeaders = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  userSignUp(data: SignUp): void {
    this.http
      .post(`${this.apiUrl}/admin`,
        data,
        { observe: 'response', headers: this.ngrokHeaders }
      ).subscribe((result) => {
      this.isAdminLoggedIn.next(true);
      localStorage.setItem('admin', JSON.stringify(result.body));
      this.router.navigate(['admin-home']);
    });
  }

  reloadAdmin(): void {
    if (localStorage.getItem('admin')) {
      this.isAdminLoggedIn.next(true);
      this.router.navigate(['admin-home']);
    }
  }

  userLogin(data: login) {
    console.warn(data);
    this.http.get(`${this.apiUrl}/admin?email=${data.email}&password=${data.password}`,
      { observe: 'response', headers: this.ngrokHeaders }
    ).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length) {
        console.warn("user logged in");
        localStorage.setItem('admin', JSON.stringify(result.body));
        this.router.navigate(['admin-home']);
      } else {
        console.warn("login failed");
        this.isLoginError.emit(true);
      }
    });
  }
}
