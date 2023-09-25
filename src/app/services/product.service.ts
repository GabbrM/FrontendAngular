import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { cart, order, product } from "../models/data-model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  // Reemplaza esta URL por la URL de Ngrok
  private apiUrl = 'https://b047-38-25-16-199.ngrok-free.app'; // URL de Ngrok

  constructor(private http: HttpClient) { }

  // Agrega un encabezado personalizado para omitir la advertencia de Ngrok
  private ngrokHeaders = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });

  addProduct(data: product) {
    return this.http.post(`${this.apiUrl}/products`, data, { headers: this.ngrokHeaders });
  }

  productList() {
    return this.http.get<product[]>(`${this.apiUrl}/products`, { headers: this.ngrokHeaders });
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`, { headers: this.ngrokHeaders });
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.apiUrl}/products/${id}`, { headers: this.ngrokHeaders });
  }

  updateProduct(product: product) {
    return this.http.put<product>(`${this.apiUrl}/products/${product.id}`, product, { headers: this.ngrokHeaders });
  }

  popularProducts() {
    return this.http.get<product[]>(`${this.apiUrl}/products?_limit=3`, { headers: this.ngrokHeaders });
  }

  trendyProducts() {
    return this.http.get<product[]>(`${this.apiUrl}/products?_limit=8`, { headers: this.ngrokHeaders });
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`${this.apiUrl}/products?q=${query}`, { headers: this.ngrokHeaders });
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(`${this.apiUrl}/cart`, cartData, { headers: this.ngrokHeaders });
  }

  getCartList(userId: number) {
    this.http.get<product[]>(`${this.apiUrl}/cart?userId=` + userId, { observe: 'response', headers: this.ngrokHeaders }).subscribe((result) => {
      console.warn(result);
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeToCart(cartId: number) {
    return this.http.delete(`${this.apiUrl}/cart/` + cartId, { headers: this.ngrokHeaders });
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`${this.apiUrl}/cart?userId=` + userData.id, { headers: this.ngrokHeaders });
  }

  orderNow(data: order) {
    return this.http.post(`${this.apiUrl}/orders`, data, { headers: this.ngrokHeaders });
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`${this.apiUrl}/orders?userId=` + userData.id, { headers: this.ngrokHeaders });
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.apiUrl}/cart/` + cartId, { headers: this.ngrokHeaders }).subscribe((result) => {
      this.cartData.emit([]);
    });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${this.apiUrl}/orders/` + orderId, { headers: this.ngrokHeaders });
  }
}
