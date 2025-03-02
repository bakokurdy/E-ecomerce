import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { groupshops, MyContact, Product } from '../core/model/object-model';
import { ProductService } from '../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../core/services/api.service';
import { identity } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [ CommonModule,RouterLink,HttpClientJsonpModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  all_product_data:any
  addEditProductForm!:FormGroup;
  addEditProduct:boolean = false;
  popup_header!:string;
  add_product!:boolean;
  edit_prouct!:boolean;
  prouct_data:any;
  single_product_data:any;
  product_dto!:Product
  edit_product_id:any;
  public product_data : MyContact [] = [];
  public groupId: MyContact = {} as MyContact;
   public groups: groupshops[] = [] as groupshops[];
  onum!:string;
  constructor(private fb:FormBuilder, private productService:ProductService){

  }

  ngOnInit(): void {
    this.addEditProductForm = this.fb.group({
      name:['',Validators.required],
      onum:['',Validators.required],
      uploadPhoto:['',Validators.required],
      uploadDesc:['',Validators.required],
      mrp:['',Validators.required],
      db:['',Validators.required],
      status:['',Validators.required],
      groupId:['',Validators.required]
    })
    this.getAllProduct();
    this.productService.allgroups(this.groupId).subscribe((data: groupshops[]) =>{
     this.groups = data;
    });
   // this.productService.addNewProduct().subscribe((data:MyContact )=>{
    // this.all_product_data = data;
    //})
  }
  get rf(){
    return this.addEditProductForm.controls;
  }
  getAllProduct(){
    this.productService.allProduct(this.groupId).subscribe(data=>{
      this.all_product_data = data;
      console.log("My All product", this.all_product_data)
    },error=>{
      console.log("Somthing went wrong ", error)
    })
  }
  addProductPopup(){
    this.add_product = true;
    this.edit_prouct = false;
    this.popup_header = "Add new Product";
    this.addEditProductForm.reset();
  }
  addNewProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.prouct_data = this.addEditProductForm.value;
    this.product_dto = {
      id:this.prouct_data.id,
      name:this.prouct_data.name,
      onum:this.prouct_data.onum,
      uploadPhoto:this.prouct_data.uploadPhoto,
      uploadDesc:this.prouct_data.uploadDesc,
      mrp:this.prouct_data.mrp,
      db:this.prouct_data.db,
      status:this.prouct_data.status,
      //groupId:this.product_data.groupId,
        //shop_num:this.prouct_data.shop_num
      
      
        
    }
    this.productService.addNewProduct(this.product_dto).subscribe(data=>{
      console.log(data);
      this.getAllProduct();
      this.addEditProductForm.reset();
    },error=>{
      console.log("my error", error)
    })
  }
   
  editProductPopup(id: any){
    this.edit_prouct=id;
    this.add_product = false;
    this.edit_prouct = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe(data =>{
      this.single_product_data = data;
      console.log("Single Data", this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductForm.setValue({
        id:this.single_product_data.id,
        name:this.single_product_data.name,
        onum:this.single_product_data.onum,
        uploadPhoto:this.single_product_data.uploadPhoto,
        uploadDesc:this.single_product_data.uploadDesc,
        mrp:this.single_product_data.mrp,
        db:this.single_product_data.db,
        status:this.single_product_data.status,
        shop_num:this.single_product_data.shop_num,
        groupId:this.single_product_data.groupId
      });
    })
  }
  updateProduct(){
    this.addEditProduct= true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.prouct_data = this.addEditProductForm.value;
    this.product_dto = {
      id:this.product_data.findIndex(identity),
      //groupId: this.prouct_data.groupId,
      name:this.prouct_data.name,
      onum:this.single_product_data.onum,
      uploadPhoto:this.prouct_data.uploadPhoto,
      uploadDesc:this.prouct_data.uploadDesc,
      mrp:this.prouct_data.mrp,
      db:this.prouct_data.db,
      status:this.prouct_data.status
    
      
      
    }
    this.productService.updateProduct(this.edit_product_id,this.product_dto).subscribe(data =>{
      this.getAllProduct();
      this.product_dto= data;
      this.addEditProductForm.reset();
    },error=>{
      console.log("my error", error)
    });
  }
  deleteProduct(id:any){
    let conf = confirm("Do you want to delete this product id:" +id);
    if(conf){
      this.productService.deleteProduct(id).subscribe(data=>{
        console.log("Deleted successfull",data);
        this.getAllProduct();
      },err=>{
        console.log(err)
      });
    }else{
      alert("You pressed cancel !")
    }
  }
}

