import {EventEmitter, Injectable} from '@angular/core';
import {login, product, SignUp} from "../models/data-model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp){
    this.http.post("http://a06c-38-25-16-199.ngrok-free.app/users", user, {observe: 'response'})
      .subscribe((result) => {
        console.warn(result);
        if (result){
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data: login){
    this.http.get<SignUp[]>(`http://a06c-38-25-16-199.ngrok-free.app/users?email=${data.email}&password=${data.password}`,
      {observe: 'response'})
      .subscribe((result) => {
        if (result && result.body?.length){
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }else {
          this.invalidUserAuth.emit(true);
        }
      })
  }
  userAuthReload(){
    if (localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  getUserProfile(payment: string) {
    return this.http.get<SignUp>(`http://a06c-38-25-16-199.ngrok-free.app/users/${payment}`);
  }
}
