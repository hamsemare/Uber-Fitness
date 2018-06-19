import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

	validateRegister(user){
	  	if(user.name== undefined || user.email== undefined || user.password== undefined || user.username== undefined){
	  		return false
	  	}
	  	else{
	  		return true;
	  	}
	 }


  	validateEmail(email) {
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}


		validateEvent(event){
			if(event.name== undefined || event.date== undefined || event.sets== undefined || event.reps== undefined){
				return false
			}
			else{
				return true;
			}
	 }

		validateSets(event){
			 return !isNaN(Number(event.sets.toString()));
		}

	 	validateReps(event){
			return !isNaN(Number(event.reps.toString()));
		}

		validateDate(event){
		  const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/;
			return re.test(event.date)
	  }
}
