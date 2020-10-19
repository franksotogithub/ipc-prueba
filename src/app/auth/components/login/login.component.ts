import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, first, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorAuth: false;
  error_message= "";


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    
  ) { 
    
  

    this.buildForm();
  }

  ngOnInit() {
  }
  
  login(event){
    event.preventDefault();
    if(this.form.valid){
      let value = this.form.value;
      let username =value.username.toLowerCase();

      this.authService.login(username,value.password)
      .pipe(

        map(user => {
          // login successful if there's a jwt token in the response
          /*if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
    */

    console.log('user>>>',user);


          
        }),
        catchError((error)=>{

          console.log('An error occurred:', error);
        
          return throwError(error);
          
        })


      )
       .subscribe(
        (data) => {
          console.log('data>>>',data);

          /*console.log('data>>>',JSON.stringify(data));*/
          this.router.navigate(['/']);
        },
        error => {
          this.error_message=JSON.stringify(error.error) + JSON.stringify(error.message);
          /*this.error_message = "El usuario o el password no son correctos";*/
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
