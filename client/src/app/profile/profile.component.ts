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
  loggedIn;

  constructor(private networkService : NetworkService) {
    this.networkService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.user = this.networkService.getLoggedUser();
    console.log(this.loggedIn);
    console.log(this.user);
  }

  ngOnInit(): void {
   
  }

}
