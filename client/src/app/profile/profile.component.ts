import { User } from './../../models/user';
import { NetworkService } from './../services/network.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user : User;
  public loggedIn;

  constructor(private networkService : NetworkService) {
    // zbog menjanja stranica bez refresovanja
    this.user = networkService.getLoggedUser();
    this.loggedIn = networkService.getLoggedIn();

    
    this.networkService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.networkService.loggedUser.subscribe((loggedUser : User) => {
      this.user = loggedUser;
    });
    
  }

  ngOnInit(): void {
   
  }

}
