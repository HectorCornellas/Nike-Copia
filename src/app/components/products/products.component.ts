import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductservicesService } from '../../services/productservices.service';
import { Product } from '../../interfaces/product.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';



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

 
    try {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
          console.log("📦 Productos cargados en ProductList:", this.products);
        },
        error: (error) => {
          console.error("❌ Error al cargar productos:", error);
        }
      });
      console.log("📦 Productos cargados en ProductList:", this.products);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
     
    } finally {
  
    }
  }
}