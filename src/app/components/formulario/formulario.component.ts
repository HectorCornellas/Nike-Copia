import { Component, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { ProductservicesService } from "../../services/productservices.service" 


@Component({
  selector: "app-formulario",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
  standalone: true, 
})
export class FormularioComponent implements OnInit {
  productForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private productService: ProductservicesService,
  ) {
    this.productForm = this.fb.group({
      referencia: ["", Validators.required],
      name: ["", Validators.required],
      price: ["", Validators.required],
      description: ["", Validators.required],
      ProductType: ["", Validators.required],
      oferta: [false],
      imagen: [null],
    })
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value)
      console.log("Producto añadido:", this.productForm.value)
      this.productForm.reset()
    } else {
      console.log("Formulario inválido")
    }
  }
}