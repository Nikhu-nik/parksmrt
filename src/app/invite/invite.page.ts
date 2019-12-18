import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { RouterOutlet } from '@angular/router';
import { fader,  } from './route-animations';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
  animations: [ // <-- add your animations here
     fader,
    // slider,
    // transformer,
    // stepper
  ]
})
export class InvitePage implements OnInit {



  fullName = 'Username';


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUserDetails()
    .subscribe(data => {
      this.fullName = data.body.fullName;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
}
