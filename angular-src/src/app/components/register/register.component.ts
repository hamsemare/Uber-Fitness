import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;

  constructor(
  private validateService: ValidateService,
  private flashMessage: FlashMessagesService,
  private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
  }

	onRegisterSubmit(){
	  	const user={
	  	name: this.name,
	  	email: this.email,
	  	username: this.username,
	  	password: this.password
	  	}


	  	//Require fields
	  	if(! this.validateService.validateRegister(user)){
	  		this.flashMessage.show("Please Fill in all Fields", {cssClass: "alert-danger", timeout: 1500});
	  		return false;
	  	}

		//Validate emails
	  	if(! this.validateService.validateEmail(user.email)){
	  		this.flashMessage.show("Please use a Valid Email", {cssClass: "alert-danger", timeout: 1500});
	  		return false;
	  	}

	  	// Register User
	  	this.authService.registerUser(user).subscribe(data => {
			if(data.success){
	  			this.flashMessage.show("You are Now Registered and Can Now Login", {cssClass: "alert-success", timeout: 1500});
	  			this.router.navigate(["/login"]);
	  		}
	  		else{
				console.log(data.msg);
				if(data.msg=="Username Exists"){
					this.flashMessage.show("Username is Taken", {cssClass:"alert-danger", timeout: 1500});
				}
				else{
					this.flashMessage.show("Something went Wrong", {cssClass: "alert-danger", timeout: 1500});
				}
				this.router.navigate(["/register"]);
	  		}
	  	});
  	}
}
