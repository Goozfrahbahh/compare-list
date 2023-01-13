import { Injectable, Input, Output } from '@angular/core';
import { stringify } from 'postcss';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { __values } from 'tslib';
import { Csv, Statement } from '../models/csv';
import { NgxCsvParser } from './csv-parse.service';
import { DataStoreService } from './data.service';

@Injectable({ providedIn: 'root' })
export class CsvCompareService {
    @Output() fileUpload: Subject<any> = new Subject<Statement>();
    header: boolean = true;
    statement1: Statement[] = [];
    statement2: Statement[] = [];
    loaded: boolean = false;
    storeData1: any[] = [];
    storeData2: any[] = [];
    mapping: any[] = [];
    statementSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    statement$ = this.statementSubject.asObservable();
    statement1Subject: BehaviorSubject<any> = new BehaviorSubject<Statement[]>(this.statement1)
    statement2Subject: BehaviorSubject<any> = new BehaviorSubject<Statement[]>(this.statement2)
    constructor(
        private ngxCsvParser: NgxCsvParser,
        private dataStoreService: DataStoreService
    ) {}
    ngOnInit(): void {
	  
    }
    buildCompareData(csvData: any): Observable<Csv[]> {
        this.dataStoreService
            .getStatement1()
            .subscribe((csv) => (this.statement1 = csv));
        this.dataStoreService
            .getStatement2()
            .subscribe((csv) => (this.statement2 = csv));
        for (let i = 0; i < csvData.length; i++) {
            this.statement1.push({
                checknumber: csvData[i].checknumberID || 'none',
                transaction: csvData[i].transaction,
                amount: csvData[i].amount,
                date: csvData[i].date,
			 checked: false,
            });
            this.dataStoreService.addStatement1(this.statement1[i]);
            this.statement2.push({
                checknumber: csvData[i].checknumberID2 || 'none',
                transaction: csvData[i].transaction2,
                amount: csvData[i].amount2,
                date: csvData[i].date2,
			 checked: false,
            });
            this.dataStoreService.addStatement2(this.statement2[i]);
            this.mapping.push(this.statement1[i].checknumber);
        }
       		this.compareData(this.statement1, this.statement2);
	   		this.statement1Subject.next(this.statement1);
        		this.statement2Subject.next(this.statement2);
       	     this.addDataArray(this.statement1);
        	     this.addDataArray2(this.statement2);
			this.statementSubject.next(true);
        		return csvData;
    }
    compareData(statement1: Statement[], statement2: Statement[]) {
        for (let i = 0; i < statement1.length - 2; i++) {
            for (let j = 0; j < statement2.length; j++) {
                if (statement1[i].checknumber === statement2[j].checknumber) {
                    statement1[i].checked = true
                }
            }
        }
        for (let i = 0; i < statement2.length - 2; i++) {
            for (let j = 0; j < statement1.length; j++) {
                if (statement1[i].checknumber === statement2[j].checknumber) {
                    statement2[i].checked = true
                }
            }
        }
	   statement2.forEach(element => {
		   if (element.checked === false) {
			   this.storeData2.push(element)
		   }
	   })
	   statement1.forEach(element => {
		   if (element.checked === false) {
			   this.storeData1.push(element);
        }
	   })
    }

    addDataArray(data: Statement[]) {
        const statement1 = this.storeData1;
        const statement2 = this.storeData2;
        for (let i = 0; i < data.length; i++) {
            this.dataStoreService.addStatement2(statement1[i]);
        }
    }
    addDataArray2(data: Statement[]) {
        const statement1 = this.storeData1;
        const statement2 = this.storeData2;
        for (let i = 0; i < data.length; i++) {
            this.dataStoreService.addStatement2(statement2[i]);
        }
    }
    addStatement1(statement1: Statement): Observable<any> {
        return this.dataStoreService
            .addStatement1(statement1)
            .pipe(map((results: any) => this.statement1.push(results)));
    }
    addStatement2(statement2: Statement): Observable<any> {
        return this.dataStoreService
            .addStatement1(statement2)
            .pipe(map((results: any) => this.statement2.push(results)));
    }
}
