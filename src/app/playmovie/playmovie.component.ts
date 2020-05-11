import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-playmovie',
  templateUrl: './playmovie.component.html',
  styleUrls: ['./playmovie.component.css']
})
export class PlaymovieComponent implements OnInit {
  static trailerlink="";
  static movielink="";
  static moviename="";
  static year="";
  static watchingmovie: boolean;
  value: string ="https://drive.google.com/file/d/1oGEd5U0gC6ds0EdLAJTQ6H8d2oAj2oAL/preview";
  urlSafe: SafeResourceUrl;
   trusted: any;
  validate: boolean;
  
  constructor(public sanitizer: DomSanitizer,private spinner:NgxSpinnerService) {  }
 
   ngOnInit() {
     this.control();
     this.validate=PlaymovieComponent.watchingmovie;
     this.spinner.show();
  
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 3000);
 
   }
 
   control(){
   // this.trusted=this.sanitizer.sanitize(SecurityContext.URL, this.value);
   if(PlaymovieComponent.watchingmovie){
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(PlaymovieComponent.movielink);
   }
   else if(!PlaymovieComponent.watchingmovie){
   this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(PlaymovieComponent.movielink);
   } 
  }

  board()
{
  
  return PlaymovieComponent.moviename+"-"+PlaymovieComponent.year;
}

}
