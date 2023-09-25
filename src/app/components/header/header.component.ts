import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  adminName: string = "";
  searchResult: undefined | product[];
  userName: string = "";
  cartItems = 0;
  constructor(private router: Router, private product: ProductService) {
  }

  ngOnInit(){
    this.router.events.subscribe((val: any) => {
      if (val.url){
        if (localStorage.getItem('admin') && val.url.includes('admin')){
          console.warn("in admin area");
          this.menuType='admin';
          if (localStorage.getItem('admin')){
            let adminStore = localStorage.getItem('admin');
            let adminData = adminStore && JSON.parse(adminStore)[0];
            this.adminName = adminData.name;
          }
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id)
        } else {
          console.warn("outside admin");
          this.menuType='default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
        this.cartItems = items.length;

    })
  }
  logout(){
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(query: KeyboardEvent){
      if (query){
        const element = query.target as HTMLInputElement;
        this.product.searchProducts(element.value).subscribe((result) => {
            if (result.length > 5){
              result.length = 5;
            }
          this.searchResult= result;
        })
      }
  }

  hideSearch(){
    this.searchResult = undefined;
  }
  redirectToDetails(id: number){
    this.router.navigate(['/details/' + id]);
  }
  submitSearch(val: string){
    console.warn(val);
    this.router.navigate([`search/${val}`])
  }
}
