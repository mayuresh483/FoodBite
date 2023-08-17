import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl:string='';

  constructor(
    private userService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(5)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(5)]],
        confirmPassword: ["", Validators.required],
        address: ["", [Validators.required, Validators.minLength(10)]],
      },
      {
        validators: this.passwordMatchValidation("password", "confirmPassword"),
      }
    );
    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get f() {
    return this.registrationForm.controls;
  }

  passwordMatchValidation(password: string, confirmPassword: string) {
    const validator = (form: AbstractControl) => {
      const passwordControl = form.get(password);
      const confirmPasswordControl = form.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) return;
      if (passwordControl.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatch: true });
      } else {
        const errors = confirmPasswordControl.errors;
        if (!errors) return;
        delete errors.notMatch;
        confirmPasswordControl.setErrors(errors);
      }
    };
    return validator;
  }

  onSubmit(){
    this.isSubmitted=true;
    const userValue = this.registrationForm.value;

    if(this.registrationForm.invalid) return;

    const user:User={
      name:userValue.name,
      email:userValue.email,
      password:userValue.password,
      address:userValue.address
    }
    this.userService.registration(user).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
