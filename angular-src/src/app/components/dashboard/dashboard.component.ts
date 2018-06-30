// Citations
// https://www.npmjs.com/package/ng-fullcalendar

import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {EventService} from "../../services/event.service";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	name: String;
	weight:String;
	date: String;
	sets: String;
	reps: String;
	username: String;
	eventList: any=[]


	events: any[];
	calendarOptions: Options;
	@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

	constructor(
		private validateService: ValidateService,
		private flashMessage: FlashMessagesService,
		private authService: AuthService,
		private eventService: EventService
	) {}

	ngOnInit() {

		this.eventService.getEvents().subscribe(data => {
			this.calendarOptions = {
				editable: true,
				defaultView: 'listWeek',
				eventLimit: false,
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay,listMonth'
				},
				selectable: true,
				events: this.eventList,
			};
		});

		this.authService.getProfile().subscribe(profile => {
			this.username=profile.user.username;
			//Got the list of workouts
			this.authService.getEvents().subscribe(data => {
 			 for(let i of data){
				 if(i.username===this.username){
					 const title= "Workout Name: "+ i.name+ ", Weight: "+ i.weight+ ", Sets: "+ i.sets+ ", Reps: "+ i.reps;
					 const date= i.date;
					 let newdata: any={
	 						title: title,
	 						start: date
	 					};
	 					this.eventList.push(newdata);
				 }
			 }
			 console.log(this.eventList);
 		 	},
 			err => {
 				console.log(err);
 				return false;
 			});
    },
	   err => {
	     console.log(err);
	     return false;
	   });
	}

	loadAgain() {
	this.eventService.getEvents().subscribe(data => {
		this.events = this.eventList;
	});
 }



	onSubmit(){
	  	const event={
		  	name: this.name,
				weight: this.weight,
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
	  	if(! this.validateService.validateweights(event)){
	  		this.flashMessage.show("Please Enter a Number", {cssClass: "alert-danger", timeout: 1000});
				document.getElementById('weight').style.borderColor = "red";
	  		return false;
	  	}
			else{
				document.getElementById('weight').style.borderColor = "";
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
						document.getElementById('id01').style.display = "none";
						document.getElementById('cal').style.display = "block";

		  		}
	  		else{
					console.log(data.msg);
					this.flashMessage.show("Something went Wrong", {cssClass: "alert-danger", timeout: 1500});
					document.getElementById('id01').style.display = "block";
					document.getElementById('cal').style.display = "none";
	  		}
		  });
	}
}
