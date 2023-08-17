import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';


const Messages:any = {
  required:'Should not be empty',
  email:'Email is not valid',
  minlength:'field is too short',
  notMatch:'Password and Confirm Password does not match'
}  

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})

export class InputValidationComponent implements OnChanges, OnInit{  
  @Input()
  control!:AbstractControl;

  @Input()
  showErrorsWhen:boolean = true;
  errorMessages:string[]=[];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  checkValidation(){
    const errors =  this.control.errors;

    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key=> Messages[key]);
  }
}
