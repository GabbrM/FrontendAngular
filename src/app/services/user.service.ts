import { EventEmitter, Injectable } from '@angular/core';
import { login, SignUp } from "../models/data-model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

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

  userSignUp(user: SignUp) {
    this.http.post("http://a06c-38-25-16-199.ngrok-free.app/users", user, {
      observe: 'response',
      headers: this.addNgrokHeaders() // Agrega las cabeceras aquí
    })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data: login) {
    this.http.get<SignUp[]>(`http://a06c-38-25-16-199.ngrok-free.app/users?email=${data.email}&password=${data.password}`, {
      observe: 'response',
      headers: this.addNgrokHeaders() // Agrega las cabeceras aquí
    })
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  getUserProfile(payment: string) {
    return this.http.get<SignUp>(`http://a06c-38-25-16-199.ngrok-free.app/users/${payment}`, this.addNgrokHeaders());
  }
}
