import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {Usuario} from './../../../core/models/usuario.model';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorAuth: false;
  error_message= "";
 // private currentUserSubject: BehaviorSubject<Usuario>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService

  ) { 
    
    this.buildForm();
  }

  ngOnInit() {
  }
  
  login(event){
    event.preventDefault();
    if(this.form.valid){
      const value = this.form.value;


      this.authService.login(value.username,value.password)
      .pipe(first())
       .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error_message = "El usuario o el password no son correctos";
        });
      }
  
  }


  private buildForm(){
    this.form = this.formBuilder.group ({
      username : ['',[Validators.required ,Validators.minLength(6),]],
      password:['',[Validators.required, Validators.minLength(6)]],
      
    });
   
    this.form.valueChanges.subscribe(()=>{
      this.error_message="";
    });

  }

  getUsername(){
    return this.form.get('username');
  }

  getPassword(){
    return this.form.get('password');
  }

 

}
