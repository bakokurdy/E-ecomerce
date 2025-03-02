import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/model/object-model';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  implements OnInit{
  userProfileForm!:FormGroup;
  userProfile:boolean = false;
  user_id!:number;
  user_data:any;
  user_update_data:any;
  user_dto!:User;
  user_profile_pic:any;
  user_language:any;
  user_role:any;

  constructor(private formBuilder:FormBuilder, private router:Router,private user_Service:UserService){}

  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem('user_session_id'));
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      addlin1: ['', Validators.required],
      addlin2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
    })
    this.editUserData(this.user_id)
  }

  get rf(){
    return this.userProfileForm.controls;
  }
  editUserData(user_id:any){
    this.user_Service.getUserData(user_id).subscribe(data=>{
      this.user_data = data;
      this.user_profile_pic = this.user_data.uploadPhoto;
      this.user_language = this.user_data.language;
      this.user_role = this.user_data.role;
      this.userProfileForm.setValue({
        name:this.user_data.name,
        mobilenumber:this.user_data.mobNumber,
        age:this.user_data.age,
        dob:this.user_data.dob,
        email:this.user_data.email,
        password:this.user_data.password,
        language:this.user_data.language,
        gender:this.user_data.gender,
        addlin1:this.user_data.address.addlin1,
        addlin2:this.user_data.address.addlin2,
        city:this.user_data.address.city,
        state:this.user_data.address.state,
        zipCode:this.user_data.address.zipCode,
        aboutYou:this.user_data.aboutYou,
        uploadPhoto:''
      });
    },error=>{
      console.log("My error", error)
    })
  }
  updateProfile(){
    this.userProfile = true;
    if(this.userProfileForm.invalid){
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_dto ={
      aboutyou:this.user_update_data.aboutYou,
      age:this.user_update_data.age,
      agreetc:this.user_update_data.agreetc,
      dob:this.user_update_data.dob,
      email:this.user_update_data.email,
      gender:this.user_update_data.gender,
      address:{
        id: 0,
        addlin1: this.user_update_data.addlin1,
        addlin2: this.user_update_data.addlin2,
        city: this.user_update_data.city,
        state: this.user_update_data.state,
        zipcode: this.user_update_data.zipCode,
      },
      language:this.user_update_data.language,
      mobilenumber:this.user_update_data.mobilenumber,
      name:this.user_update_data.name,
      password:this.user_update_data.password,
      uploadPhoto:(this.user_update_data.uploadPhoto ==""? this.user_profile_pic:this.user_update_data.uploadPhoto),
      role:this.user_update_data.role
    }
    this.user_Service.updateUserData(this.user_id, this.user_dto).subscribe(data=>{
      alert("Profile Update Successfull !");
      if(this.user_role =='allaw'){
        this.router.navigateByUrl('/admin-dashboard')
      }else if(this.user_role=='sell'){
        this.router.navigateByUrl('/seller-dashboard')
      }else if(this.user_role=='buy'){
        this.router.navigateByUrl('/buyer-dashboard')
      }
    },error=>{
      console.log("My error" , error)
    })
  }
}
