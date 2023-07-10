import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  id!: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: UserService) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.id = this.service.getUser().info.curriculumCode;

      this.router.navigate(['services/'+ this.id]);
    });
}
}
