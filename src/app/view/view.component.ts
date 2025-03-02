import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { groupshops, MyContact, Product } from '../core/model/object-model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  imports: [CommonModule,RouterLink, FormsModule,ReactiveFormsModule, SpinnerComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  public loading: boolean = false;
  id : string | null=null;
  //single_product_data: string | undefined;
 public product_data: MyContact = {} as MyContact;
 //public contact: MyContact[] = [];
 public errorMessage: string | null = null;
 public group: groupshops =  {}as groupshops;
 //product_data:any
 constructor(private activateroute:ActivatedRoute, private http:HttpClient,private contactService:ProductService){}
 ngOnInit(): void {
   this.activateroute.paramMap.subscribe(param=>{
     this.id = param.get('id');
     });
   
   if(this.id){
     this.loading = true; // Show the loading spinner
   
     this.contactService.singleProduct(this.id).subscribe((data:MyContact) => {
      this.product_data = data; // Store the response data
       this.loading=false; });
       this.contactService.allgroups().subscribe((data: groupshops) =>{
         this.group= data;
       },(error) =>{
        this.errorMessage = error;
       });
   
}
 }
 public isNotEmpty(){
   return Object.keys(this.product_data).length > 0 && Object.keys(this.group).length > 0;
 }
 }

/*private fetchContactDetails(contactId: string): void {
  this.loading = true;
 this['contactService'].Singalcontact().subscribe(
   (data: any) => {
     this.contactId = data;
     this.loading = false;
   },
   (error: string | null) => {
     this.errorMessage = error;
     this.loading = false;
   }
 );
} 



/*
export class YourComponent {
 contactId: string;

 constructor(private route: ActivatedRoute) {
   this.route.params.subscribe(params => {
     this.contactId = params['id'];
   });
 }
}*/


