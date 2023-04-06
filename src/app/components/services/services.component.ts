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
  deletionYear!: number;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.registrationYear = this.user.info.registrationYear;
    this.curriculum = this.user.info.curriculum;
    this.deletionYear = this.calculateYearOfDeletion();
  }

  calculateYearOfDeletion():number {
    if (this.curriculum=='ΠΡΟΓΡΑΜΜΑ 5 ΕΤΩΝ ΣΠΟΥΔΩΝ (2019)'){
      if (this.registrationYear<2015) return 2026;
      if (this.registrationYear<2021) return 2029;
      if (this.registrationYear>=2022) return this.registrationYear+8;
    }
    else {
      if (this.registrationYear<=2016) return 2025;
      if (this.registrationYear<2021) return 2027;
      if (this.registrationYear>=2022) return this.registrationYear+6;
    }
    return -1;
  }
}
