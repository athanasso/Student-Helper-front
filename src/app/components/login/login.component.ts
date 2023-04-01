import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private service: LoginService, private userService: UserService, private router: Router) {}

  username!: string;
  password!: string;

  onSubmit(){
    this.service.getUser(this.username, this.password).subscribe({
      next: data => {
        this.userService.setUser(data);
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['home']);
      }
    });
  }
}
