import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet, UrlHandlingStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,HttpClientModule,  FooterComponent, FormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenHeight:any;
 screenWidth:any;
 footerMaxHeight!:number;
  title = 'E-ecomerce';
 
  constructor(){
    this.getScreenSize(event);
  }
  
  //get(){
  //this.apiService.get().subscribe(data=>{
   // console.log(data[0]);
  //})

 // }
 

 
 @HostListener('window:resize', ['$event'])
 getScreenSize(_event:any){
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
   console.log(this.screenHeight, this.screenWidth)
   this.footerMaxHeight = this.screenHeight -160;
 }
}
  

