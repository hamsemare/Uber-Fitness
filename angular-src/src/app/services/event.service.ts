import {Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';




@Injectable()
export class EventService {
		constructor() {}
		data: any=[];

   	public getEvents(): Observable<any> {
			let events: any=[];
			events=this.data;
			console.log(this.data);
       return Observable.of(events);
    }

		// public addEvent(title, date){
		// 		let newdata: any=[{
		// 				title: title,
		// 				start: date
		// 			}];
		// 			this.data= this.data.concat(newdata);
		// 			return this.data;
		//
		// }
}
