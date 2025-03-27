import { Injectable,signal} from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Product } from "../interfaces/product.interface";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root",
})
export class ProductservicesService {
  constructor(private http: HttpClient) {}
  private products: Product[] = [  ];
  private productsSignal = signal(this.products);
  private filteredProductsSubject = new BehaviorSubject<Product[]>([])
private apiURL = 'http://localhost:3000';
private apiURLProductos = 'http://localhost:3306';


  subirImagen(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<{ imageUrl: string }>(`${this.apiURL}/upload` ,formData);
  }

  // 📌 Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProductos + "/productos");
  }

  // 📌 Registrar un nuevo producto
  addProduct(product: Product): Observable<{ message: string; id: number }> {
    return this.http.post<{ message: string; id: number }>(this.apiURLProductos + "/products", product);
  }

  // 📌 Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProductos + "/productos"}/${id}`);
  }

  // 📌 Editar un producto
  updateProduct(id: number, product: Partial<Product>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiURLProductos + "/productos"}/${id}`, product);
  }

  // 📌 Eliminar un producto
  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiURLProductos + "/productos"}/${id}`);
  }

  searchProducts(searchTerm: string): void {
    if (!searchTerm) {
      this.resetSearch()
      return
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase()
    const filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseSearchTerm) ||
        product.descripcion.toLowerCase().includes(lowercaseSearchTerm) ||
        product.productType.toLowerCase().includes(lowercaseSearchTerm),
    )

    this.filteredProductsSubject.next(filteredProducts)
  }

  resetSearch(): void {
    this.filteredProductsSubject.next([...this.products])
  }

  // private updateProducts(): void {
  //   this.productsSubject.next([...this.products])
  //   this.filteredProductsSubject.next([...this.products])
  // }

  getFirstThreeProducts(): Observable<Product[]> {
    return of(this.products.slice(0, 3));
  }
}