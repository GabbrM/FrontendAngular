import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";

@Component({
  selector: 'app-admin-add-p',
  templateUrl: './admin-add-p.component.html',
  styleUrls: ['./admin-add-p.component.css']
})
export class AdminAddPComponent {

  addProductMessage: string | undefined;
  constructor(private product: ProductService) {
  }
  submit(data: product){
    console.warn(data);
    this.product.addProduct(data).subscribe((result) => {
      if (result){
        this.addProductMessage="Product is successfully added";
      }
      setTimeout(() => this.addProductMessage= undefined, 3000);
    })
  }
}
