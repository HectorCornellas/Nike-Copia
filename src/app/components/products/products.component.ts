import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductservicesService } from '../../services/productservices.service';
import { Product } from '../../interfaces/product.interface';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = []
  constructor(private productService: ProductservicesService) {}
 
  ngOnInit() {
    // With Signals, we just need to get the current value
 
    try {
      this.products = this.productService.getProducts();
      console.log("📦 Productos cargados en ProductList:", this.products);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
     
    } finally {
  
    }
  }
}