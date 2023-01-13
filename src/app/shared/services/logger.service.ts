import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerService {
	logs: any[] = [];
	constructor() { }
	public add(message: any) {
		this.logs.push(message);
	}
	public clear() {
          this.logs = [];
     }
}