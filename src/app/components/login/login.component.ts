import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: LoginService, private userService: UserService, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) {}

  loginForm!: FormGroup;
  message: string = '';
  error: string = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required])
    });
  }

  onSubmit(){
    this.error = '';
    this.message = 'Logging in';
    if (this.loginForm.valid){
      this.service.getUser(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (data) => {
          this.userService.setUser(data);
          this.userService.isLoggedIn = true;
          this.router.navigate(['home']);
        },
        (error) => {
          console.log(error);
          this.error = error.statusText;
          this.openSnackBar(this.error);
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
    setTimeout(()=> {
      this.dismiss();
    }, 2000);
  }

  dismiss() {
    this.snackBar.dismiss();
  }
}
