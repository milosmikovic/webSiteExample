import { NetworkService } from './../services/network.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  loggedIn;

  constructor(private networkService : NetworkService) {
    this.networkService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      // setTimeout(() => {console.log("navigation:" + this.loggedIn)},5000)
    });
  }

  ngOnInit(): void {
    
  }

  public onLogOut(){
    this.networkService.logout();
  }

}
