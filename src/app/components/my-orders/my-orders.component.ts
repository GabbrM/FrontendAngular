import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {order} from "../../models/data-model";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData: order[] | undefined;
  constructor(private product: ProductService) {
  }

  ngOnInit(){
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    if (orderId) {
      this.product.cancelOrder(orderId).subscribe(
        () => {
          this.getOrderList();
        },
        (error) => {
          console.error('Error cancelling order:', error);
          // Handle the error here (e.g., show an error message to the user).
        }
      );
    }
  }


  getOrderList() {
    this.product.orderList().subscribe(
      (result) => {
        this.orderData = result;
      },
      (error) => {
        console.error('Error fetching order list:', error);
        // Handle the error here (e.g., show an error message to the user).
      }
    );
  }

}
