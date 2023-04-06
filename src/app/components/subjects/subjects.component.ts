import { Component } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  constructor(private userService: UserService){}

  user!: User;

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}
