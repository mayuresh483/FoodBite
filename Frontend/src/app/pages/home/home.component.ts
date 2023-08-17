import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];
  isSearching:boolean=false;
  constructor(private foodService:FoodService, private activatedRoute:ActivatedRoute){
    
    activatedRoute.params.subscribe((params)=>{
      if(params['searchfood']){
        this.isSearching=true;
        this.foodService.getFoodFromSearch(params['searchfood']).subscribe((foods)=>{
          this.foods= foods;
        },(error:HttpErrorResponse)=>{
          this.isSearching=false;
          alert("Unable to get the Response");
        });
      }else if(params['foodTag']){
        this.foodService.getAllFoodByTag(params['foodTag']).subscribe((foods)=>{
          this.foods= foods;
        },(error:HttpErrorResponse)=>{
          alert("Unable to get the Response");
        });
      }else{
        this.foodService.getAll().subscribe((foods)=>{
          this.foods= foods;
        },(error:HttpErrorResponse)=>{
          alert("Unable to get the Response");
        });
      }
    })
  }

  ngOnInit(): void {
    
  }

}
