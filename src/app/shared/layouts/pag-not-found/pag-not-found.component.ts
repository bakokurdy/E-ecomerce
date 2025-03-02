import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-pag-not-found',
  imports: [CommonModule],
  templateUrl: './pag-not-found.component.html',
  styleUrl: './pag-not-found.component.css'
})
export class PagNotFoundComponent implements OnInit {
 /* constructor(private location: Location){}
  ngOnInit(): void {
    this.cancel();
  }
    cancel(): void {
    this.location.back();
  }*/
  
    constructor(private location: Location, private router: Router) {}
      
    ngOnInit(): void {
      this.cancel();
    }
  
    cancel(): void {
      // If the history length is more than 1, go back to the previous page.
      if (window.history.length > 1) {
        this.location.back();
      } else {
        // Redirect to a default route, like home or custom 404 page
        this.router.navigate(['/not-found']); 
      }
    }


}
