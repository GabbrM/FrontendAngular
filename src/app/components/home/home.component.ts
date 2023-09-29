import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {product} from "../../models/data-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts: undefined | product[] = [];
  trendyProducts: undefined | product[] = [];
  animeProducts: undefined | product[] = [];
  kpopProducts: undefined | product[] = [];
  lecturaProducts: undefined | product[] = [];
  constructor(private product: ProductService) {
  }
  ngOnInit() {
    this.product.getPopularAnimeProducts().subscribe((data) => {
      this.animeProducts = data;
    });

    this.product.getPopularKpopProducts().subscribe((data) => {
      this.kpopProducts = data;
    });

    this.product.getPopularLecturaProducts().subscribe((data) => {
      this.lecturaProducts = data;
    });

    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });

    // Luego, puedes hacer lo mismo para los productos trendy de cada categoría.
  }
}
