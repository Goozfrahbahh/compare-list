import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, concatAll, concatMap, map, of, switchMap, takeLast, tap } from 'rxjs';
import { Csv, Statement } from '../models/csv';

@Injectable({ providedIn: 'root' })
export class StoreService {
    statement1: Statement[] = [];
    statement2: Statement[] = [];
    s1SubjectStore: BehaviorSubject<any> = new BehaviorSubject<Csv[]>([]);
    s1$ = this.s1SubjectStore.asObservable();

    s2SubjectStore: BehaviorSubject<any> = new BehaviorSubject<Csv[]>([]);
    s2$ = this.s2SubjectStore.asObservable();

    downloads1Subject: BehaviorSubject<Statement[]> = new BehaviorSubject<
        Statement[]
    >(this.statement1);
    downloads1$ = this.downloads1Subject.asObservable();

    downloads2Subject: BehaviorSubject<Statement[]> = new BehaviorSubject<
        Statement[]
    >(this.statement2);
    downloads2$ = this.downloads2Subject.asObservable();

    uploadData: Csv[] = [];
    data: Csv[] = [];

    statement1Store: Statement[] = [];
    statement2Store: Statement[] = [];
    constructor() {}

    ngOnInit() {}
    setDataExport(s1: any, s2: any) {
        this.statement1 = s1;
        this.statement2 = s2;
        this.downloads1Subject.next(this.statement1);
        this.downloads2Subject.next(this.statement2);
    }

    setData(data: Csv) {
        this.uploadData.push(data);
        console.log(this.uploadData);
    }

    setS1andS2() {
        const data1 = of(this.uploadData);

        const newData = data1.pipe(concatMap((data) => (data = data)));

        newData.subscribe((data: any) => (this.data = data));

        console.log(this.data);

        for (let i = 0; i < this.data.length; i++) {
            const statement1 = {
                checknumber: this.data[i].checknumber,
                transaction: this.data[i].transaction,
                amount: this.data[i].amount,
                date: this.data[i].date,
                checked: false,
            };
            const statement2 = {
                checknumber: this.data[i].checknumber2,
                transaction: this.data[i].transaction2,
                amount: this.data[i].amount2,
                date: this.data[i].date2,
                checked: false,
            };

            this.statement1Store.push(statement1);
            this.statement2Store.push(statement2);
        }
        console.log(this.statement1Store);
        console.log(this.statement2Store);
        this.s1SubjectStore.next(this.statement1Store);
        this.s2SubjectStore.next(this.statement2Store);
    }
}