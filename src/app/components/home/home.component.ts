import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService){}

  user!: User;

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
