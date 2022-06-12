import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public current_Product = new Product();
  productForm: FormGroup;
  public types: ProductType[];

  constructor(
     private productService: ProductService,
     private fb: FormBuilder,
     private activatedRoute : ActivatedRoute, 
     private router : Router
     ) { }

  ngOnInit(): void {

    const pipe = new DatePipe('en-US');

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      created_at: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.productService.getProductById(this.activatedRoute.snapshot.params['id']).subscribe((product: Product) =>{
      this.displayProduct(product);
    })

    this.productService.getAllProductsType().subscribe(typeData =>{
      console.log("typeProd: ",typeData);
      this.types = typeData;
    });
  }

  public updateProduct(): void {
    console.log("ajouterrr: ",this.productForm.value)
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const product : Product = {
          ...this.current_Product,
          ...this.productForm.value
        };

        this.productService.updateProduct(this.activatedRoute.snapshot.params['id'],product).subscribe({
          next :() => this.saveCompleted(),
          error: (err) => { alert("Probléme lors de la modification !"); }
        });
      }
    }
  }

  public saveCompleted(): void {
    this.productForm.reset();
    this.router.navigate(['/produits']);
  }

  public displayProduct(product: Product): void {
    console.log("prodddddddd:",product);
    this.current_Product = product;

    this.productForm.patchValue({
      name: this.current_Product.name,
      created_at: this.current_Product.created_at,
      type:this.current_Product.type?.name
    });
  }

}
