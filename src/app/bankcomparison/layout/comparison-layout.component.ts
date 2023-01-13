import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { CsvCompareService } from '../../shared/services/csv-compare.service';

@Component({
	selector: 'app-layout',
	templateUrl: 'layout.component.html',
	styleUrls: ['layout.component.scss'],
})

export class LayoutComponent implements OnInit {
	loaded: boolean = false;
	constructor(private csvCompareService: CsvCompareService) { }

	ngOnInit() {
		this.csvCompareService.statement$.pipe(
			tap(value => console.log(value))).subscribe(value => this.loaded = value)
      }

}