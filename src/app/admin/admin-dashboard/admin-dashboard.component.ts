import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../core/model/object-model';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

 User_dashboard_data: any
 total_User:number = 0;
 admin_User:number = 0;
 sell_User:number = 0;
 buy_User:number = 0;

 product_dashboard_data: any;
 total_product:number = 0;
 publish_product:number = 0;
 inactive_product:number = 0;
 draft_product:number = 0;
 constructor(private router: Router,private adminService: AdminService){}

  ngOnInit(): void {
   this.adminProductDashboarddata();
   this.adminUserDashboarddata();
    
  }

  userDashboard(){
   return this.router.navigateByUrl("/admin/user");
  }
  productDashboard(){
    return this.router.navigateByUrl("/admin/Product");
   }
   adminUserDashboarddata(){
    return this.adminService.userDashboarData().subscribe(data =>{
      this.User_dashboard_data = data;
      console.log(this.adminUserDashboarddata);
      for(let user in this.User_dashboard_data){
           if(this.User_dashboard_data[user].role=='allaw'){
               ++this.admin_User;
           }else if(this.product_dashboard_data[user].role=='sell'){
            ++this.sell_User;
           }else if(this.product_dashboard_data[user].role=='buy'){
            ++this.buy_User;
           }
           ++this.total_User;
      }
    }, error=>{
       console.log("my error ",error);
    })
   }

   adminProductDashboarddata(){
    return this.adminService.productDashboarData().subscribe(data =>{
            this.product_dashboard_data = data;
            console.log(this.adminProductDashboarddata);
            for(let status in this.product_dashboard_data){
              if(this.product_dashboard_data[status].status == 'publish'){
                  ++this.publish_product;
              }else if(this.product_dashboard_data[status].status == 'inactive'){
               ++this.inactive_product;
              }else if(this.product_dashboard_data[status].status == 'draft'){
               ++this.draft_product;
              }
              ++this.total_product;
            }
    }, error =>{
      console.log("my error ",error);
   })
   }
}
