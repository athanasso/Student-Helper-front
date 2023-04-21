import { Component } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  constructor(private userService: UserService){}

  user!: User;
  registrationYear!: number;
  curriculum!: string;
  deletionYear!: string;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.registrationYear = this.user.info.registrationYear;
    this.curriculum = this.user.info.curriculum;
    this.deletionYear = this.user.info.deletionYear;
  }
}
