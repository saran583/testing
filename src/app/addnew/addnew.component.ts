import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  movie: string="";
  buf: string="";
  year: string="";
  msg: string="";
  trailer: string="";
  dlink :string="";
  names=[];
  poster: string="";
  result: string="";

  constructor(private db:AngularFirestore) { }

  ngOnInit() {
  }

  async getmovie(){
    if ( this.movie == null ){
       this.buf = "Movie name can't be empty"
      }
     else {
        this.buf = "" ;
        await fetch ('https://www.omdbapi.com/?apikey=762a3982&s=' + this.movie + '&y=' + this.year ) 
       . then ( response => response . json ()) . then( res => this.names = res.Search )
       console.log(this.names);
       console.log(this.names); 
       if ( this.names.length < 1 ){
          this.msg = "No Movies Found with this Name " + this.movie ;
          console.log("No movie found");
         }
       else{
         console.log("yes");
       } 
       } 
       }

validate(){
  if(this.movie.length>0 && this.year.length>0 && this.dlink.length>0 && this.trailer.length>0 && this.poster.length>0){
    return true;
  }
  return false;
}

Sendtodb(){
  var tm=Date.now().toString();
  var resp=this.db.collection("movies").doc(tm).set({
     "UID": tm, 
     "MovieName": this.movie, 
     "Year": this.year, 
     "Trailer": this.trailer, 
     "Link": this.dlink, 
     "Poster": this.poster 
    });
    if(resp.toString() == "[object Promise]"){
      this.movie="";
      this.year="";
      this.trailer="";
      this.dlink="";
      this.poster="";
      this.names=[];
      this.result="Movie added to Database";
    }
}


}
