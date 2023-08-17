import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted:boolean = false;
  returnUrl:string='';

  constructor(private fb:FormBuilder,private userService:UsersService,
    private activatedRoute:ActivatedRoute,private router:Router){

    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    console.log(this.returnUrl);
  }

  get g(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((res)=>{
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
