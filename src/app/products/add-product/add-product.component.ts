import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProduct = new Product();
  productForm: FormGroup;
  public types: ProductType[];

  constructor(
    private productService: ProductService,
     private fb: FormBuilder,
     private router : Router
     ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      created_at: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.productService.getAllProductsType().subscribe(typeData =>{
      console.log("typeProd: ",typeData);
      this.types = typeData;
    })
  }

  public ajouterProduct(): void {
    console.log("ajouterrr: ",this.productForm.value)
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const product : Product = {
          ...this.newProduct,
          ...this.productForm.value
        };

        this.productService.addProduct(product).subscribe({
          next :() => this.saveCompleted(),
          error: (err) => { alert("Probléme lors de l'ajout !"); }
        });
      }
    }
  }

  public saveCompleted(): void {
    this.productForm.reset();
    this.router.navigate(['/produits']);
  }


}
