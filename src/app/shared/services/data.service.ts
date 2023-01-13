import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Csv, Statement } from '../models/csv';
import { LoggerService } from './logger.service';

const httpOptions = {
	headers: new HttpHeaders({
          'Content-Type': 'application/json'
     })
};

@Injectable({ providedIn: 'root' })
export class DataStoreService {
    statement1: Csv[];
    statement2: Csv[];
    statement: Csv[] = [];
    api_statement1 = 'api/statement1';
    api_statement2 = 'api/statement2';

    finalComparisonData: any[] = [];
    headers: any[] = [];
    constructor(private http: HttpClient, private logger: LoggerService) {}

    // Get requets all values
     getStatement1(): Observable<Statement[]> {
        const url = this.api_statement1;
        return  this.http.get<Statement[]>(url).pipe(
            tap((data) => this.log('fetched statement1')),
            catchError(this.handleError<Statement[]>('get statement'))
        );
    }
    getStatement2(): Observable<Statement[]> {
        const url = this.api_statement2;
        const statement1 = this.http.get<Statement[]>(url).pipe(
            tap((data) => this.log('fetched statement1')),
            catchError(this.handleError<Statement[]>('get statement'))
        );
        return statement1;
    }
    // Get statment by checknumber
    getStatementID1(checknumber: any): Observable<Statement> {
        const url = `${this.api_statement1}/${checknumber}`;
        return this.http.get<Statement>(url).pipe(
            tap((data) =>
                this.log(`fetched checknumber ${checknumber} statement1`)
            ),
            catchError(this.handleError<Statement>('get statement'))
        );
    }
    getStatementID2(checknumber: string): Observable<Statement> {
        const url = `${this.api_statement2}/${checknumber}`;
        return this.http.get<Statement>(url).pipe(
            tap((data) =>
                this.log(`fetched checknumber ${checknumber} statement1`)
            ),
            catchError(this.handleError<Statement>('get statement'))
        );
    }
    // ADD statement 1 & 2
    addStatement1(csv: Statement): Observable<Statement> {
        const url = `${this.api_statement1}\${csv.checknumber}`
      	 return this.http.post<Statement>(url, csv, httpOptions).pipe(
            tap((res: any) => this.log(res)),
            catchError(this.handleError<Statement>('add statement1'))
        );
    }
    addStatement2(csv: any) {
        const url = `${this.api_statement2}`;
        this.http.post<Csv[]>(url, csv, httpOptions).pipe(
            tap((res: any) => this.log(res)),
            catchError(this.handleError<Csv>('add statement1'))
        );
    }
    // DELETE All Statement1 & Statement2
    clearDatabase() {
        const url = `${this.api_statement1}`;
        const url2 = `${this.api_statement2}`;
        this.statement1 = [];
        this.statement2 = [];
        this.http
            .put(url, this.statement1)
            .pipe(map((results: any) => this.statement1 = results))
        this.http
            .put(url2, this.statement2)
            .pipe(map((results: any) => this.statement2 = results))
        this.log('Cleared all data from the database');
    }
    //DELETE Statments
    deleteStatement1(statement: Statement | string) {
    			const checknumber = typeof statement === 'string' ? statement : statement.checknumber
		    const url = `${this.api_statement1}/${checknumber}`
		    this.http.delete(url).pipe(
                  tap(() => this.log(`deleted statement1 ${checknumber}`)),
                  catchError(this.handleError<Statement>('delete statement1'))
              );
    }
    deleteStatement2(statement: Statement | string) {
    			const checknumber = typeof statement === 'string' ? statement : statement.checknumber
		    const url = `${this.api_statement2}/${checknumber}`
		    this.http.delete(url, httpOptions).pipe(
                  tap(() => this.log(`deleted statement1 ${checknumber}`)),
			   catchError(this.handleError('remove Statement 2')));
    }
    updateStatement1(checknumber: Statement | string) {
	          const url = `${this.api_statement1}/${checknumber}`;
			this.http.put(url, this.statement1, httpOptions).pipe(
				tap(() => this.log(`updated statement1 ${checknumber}`)),
                    catchError(this.handleError<Statement>('update statement1')))
    }
    updateStatement2(checknumber: Statement | string) {
	          const url = `${this.api_statement2}/${checknumber}`;
			this.http.put(url, this.statement2).pipe(
				tap(() => this.log(`updated statement2 ${checknumber}`)),
                    catchError(this.handleError<Statement>('update Statement 2')))
    }
    // Error Handler 
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
                this.log(`${operation} failed: ${error.message}`);
            	return of(result as T);
        };
    }

    private log(message: string) {
        // tslint:disable-next-line:no-console
        this.logger.add(message);
    }
}
