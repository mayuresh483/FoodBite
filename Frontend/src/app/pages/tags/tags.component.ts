import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Tags } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{

  tags?:Tags[];
  constructor(private foodService:FoodService,private loadingService:LoadingService){
    this.foodService.getAllTags().subscribe((tags)=>{
            this.tags = tags;
    }, (error:HttpErrorResponse)=>{
      alert("Unable to fetch the tags");
    });
  }

  ngOnInit(): void {
    
  }
}
