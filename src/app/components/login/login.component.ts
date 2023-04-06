import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: LoginService, private userService: UserService, private router: Router, private fb: FormBuilder) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required])
    });
  }

  onSubmit(){
    if (this.loginForm.valid){
      this.service.getUser(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: data => {
          this.userService.setUser(data);
          this.userService.isLoggedIn = true;
        },
        error: error => console.log(error),
        complete: () => this.router.navigate(['home'])
      });
    }
  }
}
