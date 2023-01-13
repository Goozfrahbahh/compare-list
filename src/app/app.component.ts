import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconService } from './shared/services/icon.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Compare';
    constructor(private iconService: IconService) { }
	ngOnInit (): void {
		this.iconService.registerIcons();
	}

    
}