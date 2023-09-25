import { EventEmitter, Injectable } from '@angular/core';
import { login, SignUp } from "../models/data-model";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // Importa HttpHeaders
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

  private apiUrl = 'https://b047-38-25-16-199.ngrok-free.app';

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    // Configura el encabezado personalizado
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    // Realiza la solicitud HTTP con el encabezado personalizado
    this.http.post(`${this.apiUrl}/users`, user, { observe: 'response', headers })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: login) {
    // Configura el encabezado personalizado
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    // Realiza la solicitud HTTP con el encabezado personalizado
    this.http.get<SignUp[]>(`${this.apiUrl}/users?email=${data.email}&password=${data.password}`,
      { observe: 'response', headers })
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
