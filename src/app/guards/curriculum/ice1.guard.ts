import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ICE1Guard {
  constructor(private service: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.service.getUser().info.curriculumCode == "ICE1") {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
