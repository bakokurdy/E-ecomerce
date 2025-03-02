import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/model/object-model';
import { HttpClientModule } from '@angular/common/http';
declare var $:any;

@Component({
  selector: 'app-user-crud',
  imports: [ CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent  implements OnInit{
 all_user_data:any;
 signal_user_data:any;
 addEditUserForm!:FormGroup;
 user_dtt!:User;
 user_reg_data:any;
 edit_user_id:any;
 upload_file!:string;
 addEditUser:boolean = false; //for form validation
 add_user:boolean = false;
 edit_user:boolean = false;
 popup_header!:string;
 signInFormValue:any ={};

  constructor(private formBuilder:FormBuilder, private adminService:AdminService){}
  
  ngOnInit(): void {
    
     this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
            name:['',Validators.required],
            age:['',Validators.required],
            dob:['',Validators.required],
            mobilenumber:['',Validators.required],
            email:['',Validators.required],
            password:['',Validators.required],
            addlin1:['',Validators.required],
            addlin2:['',Validators.required],
            city:['',Validators.required],
            state:['',Validators.required],
            zipcode:['',Validators.required],
            language:['',Validators.required],
            gender:['',Validators.required],
            uploadPhoto:['',Validators.required],
            agreetc:['',Validators.required],
            aboutyou:['',Validators.required],
            role:['',Validators.required]
    });
  }
  getAllUser(){
    return this.adminService.allUser().subscribe(data =>{
      this.all_user_data = data;
    }, error =>{
        console.log("my error" ,error)
    })
  }
   get rf(){
    return this.addEditUserForm.controls;
   }
   addUserPopup(){
    this.edit_user = false;
    this.addEditUserForm.reset(); 
    this.add_user = true;
    this.popup_header = "Add New User";
   }
   addUser(){
    this.addEditUser = true;
    if( this.addEditUserForm.invalid){
         alert('Error!!:-)\n\n' +JSON.stringify(this.addEditUserForm.value));
         return;

    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dtt={
      name:this.user_reg_data.name,
      mobilenumber:this.user_reg_data.mobilenumber,
      
      age:this.user_reg_data.age,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      password:this.user_reg_data.password,
      address:{
         id:0,
        addlin1:this.user_reg_data.addlin1,
        addlin2:this.user_reg_data.addlin2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipcode:this.user_reg_data.zipcode
      },
      language:this.user_reg_data.language,
      gender:this.user_reg_data.gender,
      uploadPhoto:this.user_reg_data.uploadPhoto,
      agreetc:this.user_reg_data.agreetc,
      aboutyou:this.user_reg_data.aboutyou,
      role:this.user_reg_data.role
    }
    this.adminService.addUser(this.user_dtt).subscribe(_data=>{
      this.addEditUserForm.reset();
      this.getAllUser();
      $('#addEditUserModel').model('toggle');
    },error=>{
      console.log("my wrong", error);
    })
   }
   editUserPopup(user_id:any){
    this.edit_user_id = user_id;
     this.edit_user = true;
     this.add_user= false;
     this.popup_header = "editUser";
     this.adminService.singleAUser(user_id).subscribe(data=>{
      this.signal_user_data = data;

      this.upload_file = this.signal_user_data.uploadPhoto;
      this.addEditUserForm.setValue({
        name:this.signal_user_data.name,
        mobilenumber:this.signal_user_data.mobilenumber,
        age:this.signal_user_data.age,
        dob:this.signal_user_data.dob,
        email:this.signal_user_data.email,
        password:this.signal_user_data.password,
        language:this.signal_user_data.language,
        gender:this.signal_user_data.gender,
        addlin1:this.signal_user_data.address.addlin1,
        addlin2:this.signal_user_data.address.addlin2,
        city:this.signal_user_data.address.city,
         state:this.signal_user_data.address.state,
        zipcode:this.signal_user_data.address.zipcode,
        aboutyou:this.signal_user_data.aboutyou,
         uploadPhoto:'',
         agreetc:this.signal_user_data.agreetc,
         role:this.signal_user_data.role,
      });
     }, error=>{
      console.log("myerror", error);
     })

   }
   updateUser(){
    if( this.addEditUserForm.invalid){
         alert('Error!! :-)\n\n' +JSON.stringify(this.addEditUserForm.value));
         return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dtt={
      name:this.user_reg_data.name,
      mobilenumber:this.user_reg_data.mobilenumber,
      age:this.user_reg_data.age,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      password:this.user_reg_data.password,
      address:{
         id:0,
        addlin1:this.user_reg_data.addlin1,
        addlin2:this.user_reg_data.addlin2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipcode:this.user_reg_data.zipcode
      },
      language:this.user_reg_data.language,
      gender:this.user_reg_data.gender,
      uploadPhoto:(this.user_reg_data.uploadPhoto ==""?
         this.upload_file: this.user_reg_data.uploadPhoto),
      
      agreetc:this.user_reg_data.agreetc,
      aboutyou:this.user_reg_data.aboutyou,
      role:this.user_reg_data.role
    }
    this.adminService.editUser(this.edit_user_id,this.user_dtt).subscribe((__data: any)=>{
      this.addEditUserForm.reset();
      this.getAllUser();
      this.updateUser();
      $('#addEditUserModel').model('toggle');
    }, error=>{
      console.log("my wrong",error);
    })
   }
   deleteUser(user_id:any){
    this.adminService.deleteUser(user_id).subscribe(_data=>{
      this.getAllUser();
    }, error =>{
      console.log("myerror",error);
    })
   }
}

