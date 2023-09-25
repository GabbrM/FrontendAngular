import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  editIcon= faEdit;
  constructor(private product: ProductService) {
  }

  ngOnInit(){
    this.list();
  }

  deleteProduct(id: number){
    console.warn("test id", id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result){
        this.productMessage="Product is deleted";
        this.list();
      }
    })
    setTimeout(() => {
      this.productMessage= undefined;
    }, 3000);
  }

  list(){
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    })
  }
}
