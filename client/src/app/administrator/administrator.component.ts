import { UserResponse } from './../../models/userResponse';
import { NetworkService } from './../services/network.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit, OnDestroy {

  public checkoutForm : FormGroup;
  private activeSubscriptions: Subscription[];

  public btnNewAdministratorClicked : Boolean;

  constructor(private formBuilder : FormBuilder,private networkService : NetworkService) {
    this.btnNewAdministratorClicked = false;

    this.activeSubscriptions = [];
    this.checkoutForm = formBuilder.group({
      name : ["",[Validators.required,Validators.pattern("[A-Z][a-z]+")]],
      surname : ["",[Validators.required,Validators.pattern("[A-Z][a-z]+")]],
      username : ["",[Validators.required,Validators.pattern("[a-z0-9A-Z]{6,12}")]],
      password : ["",[Validators.required,Validators.pattern("[a-z0-9A-Z]{6,12}")]],
      password1 : ["",[Validators.required,Validators.pattern("[a-z0-9A-Z]{6,12}")]],
      email : ["",[Validators.required,Validators.email]],
      phone : ["",[Validators.required,Validators.pattern('06[0|1|2|3|4|5|6|9]-[0-9]{3}-[0-9]{4}')]]
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public onButtonNewAdministrator(){
    
    if(this.btnNewAdministratorClicked === true){
      this.btnNewAdministratorClicked = false;
      return;
    }

    this.btnNewAdministratorClicked = true;
  }

  public onSubmit(formData){
    if(formData.password !== formData.password1){
      window.alert("Passwords do not match!")
      return;
    }
    
    const registerData  = {
      name : formData.name,
      surname : formData.surname,
      username : formData.username,
      password : formData.password,
      email : formData.email,
      phone : formData.phone
    }

    const createSub = this.networkService.createAdministrator(registerData).subscribe((data : UserResponse) => {
        window.alert("Administrator successfully created");
        this.checkoutForm.reset();
        this.btnNewAdministratorClicked = false;
    },
    (err) => {
      if(err.error.message == "usernameExists"){
        window.alert("Username already exists");
      }else if(err.error.message == "passwordExists"){
        window.alert("Password already exists");
      }else{
        window.alert("Something else went wrong");
      }
    }
    );
    this.activeSubscriptions.push(createSub);
  }

}
