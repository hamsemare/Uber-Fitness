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
		  const date= event.date.toString()
			if(date.length===10){
				console.log(date.length);
				if(date.substring(4,5)==="-" && date.substring(7,8)==="-"){
					const day= date.substring(0,4);
					const month= date.substring(5,7);
					const year= date.substring(8, 10);
					const newdate= day +"-" + month + "-"+ year;
					if(newdate===date){
						console.log(date);
							return true;
					}
				}
			}
			return false;
	  }
}
