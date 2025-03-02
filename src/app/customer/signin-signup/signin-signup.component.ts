import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import{FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,FormArray, Validators} from'@angular/forms';
import { User } from '../../core/model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-signin-signup',
  standalone:true,
  imports: [CommonModule,RouterLink,HttpClientModule ,ReactiveFormsModule,FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css',
})
export class SigninSignupComponent implements OnInit{
  regForm:boolean = false;
  signUpform!:FormGroup;
  signInfrom!:FormGroup;
  //regForm: boolean = false;
  signUpsubmitted = false;
  href:string ='';
  user_data:any;
  user_dtt!:User;
  user_reg_data:any;
  signInFormValue:any ={};
 // reg_url!: string;
 /* constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private loginService: LoginSignupService
) {}

ngOnInit(): void {
  this.href = this.router.url;
  this.regForm = this.href === '/sign-up';

  // Listen for route changes dynamically
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.href = event.url;
      this.regForm = this.href === '/sign-up';
    }
  });

  // Initialize Form Group with Validations
  this.signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    mobilenumber: ['', Validators.required], // Ensure 10-digit number
    age: ['', Validators.required], // Ensure minimum age
    dob: ['', Validators.required],
    email: ['', [Validators.required]], // Added email validation
    password: ['', Validators.required], // Added password validation
    addlin1: ['', Validators.required],
    addlin2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    language: ['', Validators.required],
    gender: ['', Validators.required],
    aboutyou: ['', Validators.required],
    uploadPhoto: ['', Validators.required],
    agreetc: [false, Validators.requiredTrue], // Ensure checkbox is checked
    role: ['', Validators.required],
  });
}

// Getter for Form Controls
get rf() {
  return this.signUpForm.controls;
}

// Submit Handler
onSubmitsignUp() {
  this.signUpsubmitted = true;

  if (this.signUpForm.invalid) {
    return;
  }

  const user_dtt = {
    name: this.signUpForm.value.name,
    age: this.signUpForm.value.age,
    agreetc: this.signUpForm.value.agreetc,
    dob: this.signUpForm.value.dob,
    email: this.signUpForm.value.email,
    gender: this.signUpForm.value.gender,
    address: {
      addlin1: this.signUpForm.value.addlin1,
      addlin2: this.signUpForm.value.addlin2,
      city: this.signUpForm.value.city,
      state: this.signUpForm.value.state,
      zipcode: this.signUpForm.value.zipcode,
    },
    language: this.signUpForm.value.language,
    mobilenumber: this.signUpForm.value.mobilenumber,
    aboutyou: this.signUpForm.value.aboutyou,
    password: this.signUpForm.value.password,
    uploadPhoto: this.signUpForm.value.uploadPhoto,
    role: this.signUpForm.value.role,
  };

  // API Call with Error Handling
  this.loginService.userRegister(user_dtt).pipe(
    catchError((error) => {
      alert("User registration failed. Please try again.");
      console.error("Registration Error:", error);
      return throwError(() => new Error(error));
    })
  ).subscribe(() => {
    alert("User Registration Successful ☺");
    this.router.navigateByUrl('/sign-in');
  });
}*/

 constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginSignupService){
    
  }
  ngOnInit():void{
    
    this.href = this.router.url;
    this.regForm = this.href =='/sign-up';

    // Optional: Listen for route changes dynamically
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.href = event.url;
        this.regForm = this.href =='/sign-up';
      }
    });

    this.signUpform = this.formBuilder.group({
      name: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      addlin1: ['', Validators.required],
      addlin2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutyou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
   
  }
  get rf() {
    return this.signUpform.controls;
    }

    onSubmitsignUp(){
      this.signUpsubmitted = true;
      if(this.signUpform.invalid){
        return;
      }
      
      this.user_reg_data = this.signUpform.value;
     
      this.user_dtt ={ 
        name:this.user_reg_data.name,
        age:this.user_reg_data.age,
        agreetc:this.user_reg_data.agreetc,
        dob:this.user_reg_data.dob,
        email:this.user_reg_data.email,
        gender:this.user_reg_data.gender,
        address:{
          id: 0,
          addlin1: this.user_reg_data.addlin1,
          addlin2: this.user_reg_data.addlin2,
          city: this.user_reg_data.city,
          state: this.user_reg_data.state,
          zipcode: this.user_reg_data.zipcode,
        },
        language:this.user_reg_data.language,
        mobilenumber:this.user_reg_data.mobilenumber,
        aboutyou:this.user_reg_data.aboutyou,
        password:this.user_reg_data.password,
        uploadPhoto:this.user_reg_data.uploadPhoto,
        role:this.user_reg_data.role
      }
      this.loginService.userRegister(this.user_dtt).subscribe((_data: any)=>{
        alert("User Register Successfull ☺");
        this.router.navigateByUrl('/sign-in');
      })
    }
    onSubmitSignIn(){
      
        const email = this.signInFormValue.Useremail;
        const password = this.signInFormValue.password;
      
        if (!email || !password) {
          alert("Please enter both email and password.");
          return;
        }
        this.loginService.authLogin(email, password).subscribe(data=>{
          this.user_data = data;
          if(this.user_data.length ===1){
            if(this.user_data[0].role ==="sell"){
              sessionStorage.setItem("user_session_id", this.user_data[0].id);
              sessionStorage.setItem("role", this.user_data[0].role);
              this.router.navigateByUrl('/sell-dashboard');
            } else if(this.user_data[0].role ==="buy"){
              sessionStorage.setItem("user_session_id", this.user_data[0].id);
              sessionStorage.setItem("role", this.user_data[0].role);
              this.router.navigateByUrl('/buy-dashboard');
            } else {
              alert("Invalid login details");
            }
          } else {
            alert("Invalid");
          }
          console.log(this.user_data);
        }, error=>{
          console.log("My error", error);
        });
      }
    }
    /*  this.loginService.authLogin(this.signInFormValue.Useremail, this.signInFormValue.password).subscribe(data=>{
        this.user_data = data;
        if(this.user_data.length ===1){
          if(this.user_data[0].role ==="sell"){
            sessionStorage.setItem("user_session_id", this.user_data[0].id);
            sessionStorage.setItem("role", this.user_data[0].role);
            this.router.navigateByUrl('/seller-dashboard');
          }else if(this.user_data[0].role ==="buy"){
            sessionStorage.setItem("user_session_id", this.user_data[0].id);
            sessionStorage.setItem("role", this.user_data[0].role);
            this.router.navigateByUrl('/buy-dashboard');
          }else{
            alert("Invalid login details");
          }
        }else{
          console.log(this.signInFormValue.Useremail, this.signInFormValue.password);
          alert("Invalid")
        }
        console.log(this.user_data)
      }, error=>{
        console.log("My error", error)
      })
    }*/

