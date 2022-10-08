import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  error = false; 
  userLogin: UserLogin = {
    username: '',
    password: ''
  } 

  constructor() { 

  }

  ngOnInit(): void {
  }

  /* checkLogin(){
    this.loginService.login(this.userLogin.username, this.userLogin.password).subscribe((data: any) => {
      if(data!=null){
        this.sessionService.set('username', data.username);
        this.sessionService.set('token',  data.token); 
        this.router.navigate(['/activities']);

      }
    },
    (error) =>{
      this.error=true; 
      console.error('error caught in component')
    });
  } */

}
export interface UserLogin{
  username: string;
  password: string;
}
