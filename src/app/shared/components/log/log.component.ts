import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
    selector: 'app-log',
    template: `
        <div class="log container">
            <button class="clear" (click)="clear()">
                clear
            </button>
            <ul
                *ngFor="let log of logs"
                class="list-group drop-shadow-xl"
            >
                <li class="log">{{ log }}</li>
            </ul>
        </div>
    `,
})
export class LogComponent implements OnInit {
	logs: any;
	
    constructor(private logger: LoggerService) {
		this.logs = [];
		this.logger.add(this.logs);
    }

    ngOnInit() {}

    clear() {
	    this.logger.clear();
    }
}