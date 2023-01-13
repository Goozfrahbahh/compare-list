import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { Csv } from '../../shared/models/csv';
import { CsvCompareService } from '../../shared/services/csv-compare.service';
import { DataStoreService } from '../../shared/services/data.service';

@Component({
    selector: 'app-list-table',
    templateUrl: 'list-table.component.html',
})
export class ListTableComponent implements OnInit {
	@Input() data: Csv[] = [];
    constructor(private elementRef: ElementRef,
					 private csvCompareService: CsvCompareService,
					private dataStore: DataStoreService) {}
    ngOnInit() {}
    editLine(): void {
	   return console.log('edit')
    }
    deleteLine(): void {
        return console.log('delete');
    }
    copyLine(): void {
        return console.log('copy');
    }
    onRowClick(row: any): void {
        console.log(row)
	}
	onRowDblClick(row: any): void  {
		console.log(row)
	}

	onRowSelect(row: any): void {
		console.log(row)
	}

	checkAllBoxes() {
		
	}



}



