import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, concat, concatAll, map, Observable, of, ReplaySubject, shareReplay, switchMap, tap } from 'rxjs';
import { CsvCompareService } from '../../shared/services/csv-compare.service';
import { Csv} from '../../shared/models/csv'
import { TitleStrategy } from '@angular/router';
import { NgxCsvParser } from '../../shared/services/csv-parse.service';

@Component({
    selector: 'app-csvupload',
    template: `
        <div class="tabs w-full h-full -mt-20">
		  <div class="header entry">
		  
		</div>
            <div *ngIf="isUploaded === false">
                <div
                    class="bg-grey-lighter flex items-center -mt-20 justify-center w-full h-screen text-white"
                >
                    <label
                        class="flex flex-col font-serif items-center w-64 px-4 py-6 tracking-wide uppercase  border-[1px] hover:border-zinc-600 border-slate-600 rounded-lg shadow-lg cursor-pointer hover:bg-zinc-800 hover:text-amber-300"
                    >
                        <svg
                            class="w-8 h-8"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                            />
                        </svg>
                        <span class="mt-2 text-base leading-normal"
                            >Select a file</span
                        >
                        <input
                            type="file"
                            #fileImportInput
                            class="hidden"
                            accept="csv"
                            (change)="fileChangeListener($event)"
                        />
                    </label>
                </div>
            </div>
            <div *ngIf="isUploaded === true">
                <div class="flex flex-col w-full h-full justify-center">
                            <app-list-table [data]="this.data"></app-list-table>
                </div>
            </div>
        </div>
    `,
})
export class CsvParserComponent implements OnInit {
    isUploaded = false;

    @ViewChild('fileInput', { static: false })
    replaycsv: ReplaySubject<any> = new ReplaySubject<any>();
    filesInput: BehaviorSubject<any> = new BehaviorSubject(1);
    header: boolean = true;
    data: Csv[] = [];
    data2: Csv[] = [];

    csvdata$ = this.replaycsv.asObservable();

    constructor(private csvCompareService: CsvCompareService,
				     private csvParser: NgxCsvParser) {}

    ngOnInit(): void {
		console.log("this.csvdata$ | async")
    }

    fileChangeListener($event: any): void {
       const files = $event.srcElement.files;
       const uploadFile = [0];
       const inputNode: any = document.querySelector('#file');
       this.header =
           (this.header as unknown as string) === 'true' ||
           this.header === true;

       const csvRecords = this.csvParser
           .parse(files[0], { header: this.header, delimiter: ',' })
           .pipe(
               map((result) => (result = result)),
               tap((result: any) => console.log(result)),

               catchError(
                   this.handleError(
                       'CsvFileParser.parse',
                       'Failed to parse Csv file'
                   )
               )
           );
	   const records = csvRecords.pipe(map(records => this.data = records))
		  
	   const record = csvRecords.pipe(
			switchMap((results: Observable<Csv[]>) => this.csvCompareService.buildCompareData(results)
			),
			map((data: any) => this.data.push(data))
			).subscribe()
	
		

               
	   this.isUploaded = true;
	   
    }

    deleteRow(checknumber: any): void {
		this.data.splice(checknumber, 1);
    }
    

    buttonEdit() {
         this.data
		this.csvdata$ = this.replaycsv.asObservable();
	}

    private handleError<T>(operation = 'operation', result?: T) {
	     return (error: any): Observable<T> => {
			console.log(error);
               return of(result as T);
			}
   }
}