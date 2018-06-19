// Citations
// https://www.npmjs.com/package/ng-fullcalendar

import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	name: String;
	date: String;
	sets: String;
	reps: String;
	username: String;

	calendarOptions: Options;
	@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

	constructor(
		private validateService: ValidateService,
		private flashMessage: FlashMessagesService,
		private authService: AuthService
	) {}
	ngOnInit() {
		this.calendarOptions = {
			editable: true,
			eventLimit: false,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listMonth'
			},
			events: [{title  : 'event1',
			start  : '2018-06-01'}],
		};


		this.authService.getProfile().subscribe(profile => {
			this.username=profile.user.username;
			console.log(this.username);
    },
     err => {
       console.log(err);
       return false;
     });
	}



	onSubmit(){
	  	const event={
		  	name: this.name,
		  	date: this.date,
		  	sets: this.sets,
	  		reps: this.reps,
				username: this.username
	  	}

	  	//Require fields
	  	if(! this.validateService.validateEvent(event)){
	  		this.flashMessage.show("Please Fill in all Fields", {cssClass: "alert-danger", timeout: 1000});
	  		return false;
	  	}


			//Require fields
	  	if(! this.validateService.validateDate(event)){
	  		this.flashMessage.show("Please Enter a Valid Date", {cssClass: "alert-danger", timeout: 1000});
				document.getElementById('date').style.borderColor = "red";
	  		return false;
	  	}
			else{
				document.getElementById('date').style.borderColor = "";
			}

			//Require fields
	  	if(! this.validateService.validateSets(event)){
	  		this.flashMessage.show("Please Enter a Number", {cssClass: "alert-danger", timeout: 1000});
				document.getElementById('sets').style.borderColor = "red";
	  		return false;
	  	}
			else{
				document.getElementById('sets').style.borderColor = "";
			}


			//Require fields
			if(! this.validateService.validateReps(event)){
	  		this.flashMessage.show("Please Enter a Number", {cssClass: "alert-danger", timeout: 1000});
				document.getElementById('reps').style.borderColor = "red";
	  		return false;
	  	}
			else{
				document.getElementById('reps').style.borderColor = "";
			}



			// Add the Event
	  	this.authService.addEvent(event).subscribe(data => {
				if(data.success){
		  			this.flashMessage.show("WORKOUT ADDED", {cssClass: "alert-success", timeout: 1500});
		  		}
	  		else{
					console.log(data.msg);
					this.flashMessage.show("Something went Wrong", {cssClass: "alert-danger", timeout: 1500});
	  		}
		  });

			// // Get the event
	  	// this.authService.getEvents().subscribe(data => {
			// 	if(data.success){
		  // 			this.flashMessage.show("WORKOUT ADDED", {cssClass: "alert-success", timeout: 1500});
		  // 		}
	  	// 	else{
			// 		console.log(data.msg);
			// 		this.flashMessage.show("Something went Wrong", {cssClass: "alert-danger", timeout: 1500});
	  	// 	}
		  // });
	// }
	}

	//Take the event that was clicked and copy its content to the add workout
	eventClick(eventObj){
		console.log(eventObj.title);
	}
}
