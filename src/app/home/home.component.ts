import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute} from '@angular/router';
import { RequestComponent } from '../request/request.component';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PlaymovieComponent } from '../playmovie/playmovie.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  names = [];
  val : string ; 
  year : string ;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  buf : string ; 
  msg : string ; 
  value: unknown[];
  array: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  checking="";
  qedar= [];
  focusing: boolean;

  constructor(private db:AngularFirestore,private spinner: NgxSpinnerService,private activatedroute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.ReadData();
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.qedar.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  onFocus(){
    this.focusing=true;
  }
  onBlur(){
    if(this.checking.length==0){
      this.focusing=false;  
    }
    
  }

navigate(counter:number){
  console.log("sequence",counter);
  PlaymovieComponent.moviename=this.value[counter]["MovieName"];
  PlaymovieComponent.year=this.value[counter]["Year"];
  PlaymovieComponent.watchingmovie=false;
  PlaymovieComponent.trailerlink=this.value[counter]["Trailer"];
  PlaymovieComponent.movielink="https://drive.google.com/file/d/1oGEd5U0gC6ds0EdLAJTQ6H8d2oAj2oAL/preview";
  //this.value[counter]["Link"];
  this.router.navigate(["/playmovie"]);
}

async ReadData(){
  return await this.db.collection("movies").valueChanges()
  .subscribe(val=>{
   console.log(val);
   this.value=val;
   console.log(this.value[0]["MovieName"])
   this.generateusernames();
 });
   }
 
  arrayOne(){
    for(let i=0;i<this.value["length"];i++){
      this.array[i]=i;
     console.log(this.array[i]);
   }
   return this.array.slice(0,this.value["length"]);
 }

 generateusernames(){
  for(let i=0;i<this.value["length"];i++){
    this.qedar[i]=this.value[i]["MovieName"];
  }    
}




}
