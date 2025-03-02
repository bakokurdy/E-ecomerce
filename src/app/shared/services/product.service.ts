import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviromnt';
import { MyContact, Product } from '../../core/model/object-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   public product_url ="http://localhost:3000/Product/";
   public group_url ="http://localhost:3000/groupshops/";
   // private http:HttpClient=inject<HttpClient>(HttpClient);
   // private prourl :string = environment.apiUrl;
  //pro_url: any;

  constructor(private http: HttpClient,private apiService:ApiService) { }
  allProduct(groupId?: MyContact):Observable<any>{
    //return this.apiService.get(this.product_url);
    return this.apiService.get(this. product_url);
  }
  addNewProduct(product_dto:any):Observable<any>{
    return this.http.post(this.product_url,product_dto);
  }
  singleProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }
  updateProduct(id:any, product_dto:any):Observable<any>{
    return this.http.put(this.product_url+id, product_dto);
  }
  deleteProduct(id: any):Observable<any>{
    return this.http.delete(this.product_url+id);
  }
 
    allgroups(groupId?: MyContact):Observable<any>{
      return this.apiService.get(this.group_url);
    }
    singleGroup(id:any){
      return this.apiService.get(this.group_url+id);
    }
    public handlError(error:HttpErrorResponse){
      let errorMessage:string='';
      if(error.error.instancofErrorEvent)
      { //clienterror
        errorMessage='error : ${error.error.Message}'
      }else
      { 
        const errorMessage ='status:${error.status}\n message${error.Message}'; 
       }
       return throwError(errorMessage);
      }

}