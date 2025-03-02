import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { Router, RouterLink } from '@angular/router';
import { Order, Product, User } from '../../../core/model/object-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cheakout',
  imports: [CommonModule,RouterLink],
  templateUrl: './cheakout.component.html',
  styleUrl: './cheakout.component.css'
})
export class CheakoutComponent implements OnInit {

  single_product_id:any;
  user_id:any;
  individual_product!:Product;
  user_detail!:User;
  user_address:any;
  user_contact_no:any;
  order_dtt!:Order

    constructor(private customerService:CustomerService, private router:Router){}
  
    ngOnInit(): void {
      this.customerService.currentProduct.subscribe(product => this.single_product_id= product);
      this.user_id = Number(sessionStorage.getItem('user_session_id'));
      this.productDetail(this.single_product_id);
      this.userAddress(this.user_id);
    }
    productDetail(single_product_id:any){
      this.customerService.individualProduct(single_product_id).subscribe(data=>{
        this.individual_product = data;
        console.warn("my single Product", this.individual_product)
      },error=>{
        console.log("My error", error)
      })
    }
    userAddress(user_id:any){
      this.customerService.userDetail(user_id).subscribe(data =>{
        this.user_address = data.address;
        this.user_contact_no = data.mobilenumber;
      },error=>{
        console.log("My error", error)
      })
    }
    placeOrder(){
      this.order_dtt={
        id:0,
        userId:this.user_id,
        sellId:2,
        product:{
          id:this.individual_product.id,
          name:this.individual_product.name,
          onum:this.individual_product.onum,
          uploadPhoto:this.individual_product.uploadPhoto,
          uploadDesc:this.individual_product.uploadDesc,
          mrp:this.individual_product.mrp,
          db:this.individual_product.db,
          status:this.individual_product.status
          
        },
        deliveryAddress:{
          id:0,
          addlin1:this.user_address.addlin1,
          addlin2:this.user_address.addlin2,
          city:this.user_address.city,
          state:this.user_address.state,
          zipcode:this.user_address.zipcode
        },
        contact:this.user_contact_no,
        dateTime: new Date().toLocaleDateString()
      }
      console.log("Place Order DTL", this.order_dtt);
      this.customerService.insertNewOrder(this.order_dtt).subscribe(data=>{
        alert("Your order Place successfull !");
        this.router.navigateByUrl("/buy-dashboard");
      },error=>{
        console.log("order error", error)
      })
    }
  }