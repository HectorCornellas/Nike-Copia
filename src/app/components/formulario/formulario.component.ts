import { Component, signal, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { ProductservicesService } from "../../services/productservices.service" 
import {  HttpClient } from '@angular/common/http';


@Component({
  selector: "app-formulario",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
  standalone: true, 
})
export class FormularioComponent implements OnInit {
  productForm: FormGroup;
  selectedImage: File | undefined;

  constructor(
    private fb: FormBuilder,
    private productService: ProductservicesService,
    private http: HttpClient,
  ) {
    this.productForm = this.fb.group({
      referencia: ["", Validators.required],
      name: ["", Validators.required],
      precio: ["", Validators.required],
      descripcion: ["", Validators.required],
      ProductType: ["", Validators.required],
      oferta: [false],
      image: [null],
    })
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.invalid || !this.selectedImage) {
      console.error('Formulario inválido o imagen no seleccionada');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('precio', this.productForm.get('precio')?.value);
    formData.append('desc', this.productForm.get('desc')?.value);
    formData.append('type', this.productForm.get('type')?.value);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.http.post<{ imageUrl: string }>('http://localhost:3000/upload', formData).subscribe(
      (response) => {
        console.log('Producto subido con éxito:', response);
        this.productForm.value.image = response.imageUrl;
        this.productService.addProduct(this.productForm.value)
        this.productForm.reset();6
        this.selectedImage = undefined;
      },
      (error) => {
        console.error('Error al subir el producto:', error);
      }
    );
  }
}
