import { Component, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import {
    combineLatestWith,
    fromEvent,
    map,
    of,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { Statement } from '../../shared/models/csv';
import { CsvCompareService } from '../../shared/services/csv-compare.service';
import { DataStoreService } from '../../shared/services/data.service';
import { StoreService } from '../../shared/services/store.service';

@Component({
    selector: 'app-edit',
    template: `
        <div class="h-full min-w-full mx-auto mt-10">
            <div class="flex flex-col mt-20">
                <app-csvdownload></app-csvdownload>
                <div class="sm:rounded-lg max-h-[80vh]shadow-md">
                    <div
                        class="inline-block min-w-full align-middle justify-center"
                    >
                        <div class="overflow-y-hidden grid grid-flow-col">
                            <div class="grid overflow-y-scroll">
                                <table
                                    class="grid dark:grid dark:divide-gray-700 drop-shadow-2xl justify-center align-middle divide-y divide-gray-200 table-auto min-w-min "
                                >
                                    <thead
                                        class="dark:bg-zinc-800 bg-zinc-700 shadow-lg inline-block"
                                    >
                                        <tr class="text-center">
                                            <th
                                                scope="col"
                                                class="flex-col justify-center p-4"
                                            ></th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 flex flex-row justify-center px-3 py-6 text-xs font-medium tracking-wider text-center text-white uppercase align-middle"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Check #</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 justify-center px-3 py-6 text-xs font-medium tracking-wider text-center text-white uppercase align-middle"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Transaction</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Amount</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Date</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="dark:bg-neutral-800 dark:divide-neutral-800 bg-zinc-800 divide-y divide-gray-200"
                                    >
                                        <tr
                                            class="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            *ngFor="
                                                let statement of s1;
                                                let i = index
                                            "
                                        >
                                            <td
                                                class="whitespace-nowrap dark:text-lime-400 text-lime-400 px-6 py-4 text-sm font-medium"
                                            >
                                                {{ statement.checknumber }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-white px-6 py-4 text-sm font-medium text-gray-500"
                                            >
                                                {{ statement.transaction }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-amber-300 px-6 py-4 text-sm font-medium text-gray-900"
                                            >
                                                {{ statement.amount }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-blue-400 px-6 py-4 text-sm font-medium text-gray-500"
                                            >
                                                {{ statement.date }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-blue-400 px-6 py-4 text-sm font-medium text-gray-500"
                                            >
                                                {{ similarityScores[i] }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="grid overflow-y-scroll">
                                <table
                                    class="grid dark:divide-gray-700 drop-shadow-2xl justify-center align-middle divide-y divide-gray-200 table-auto"
                                >
                                    <thead
                                        class="dark:bg-zinc-800 bg-zinc-700 shadow-lg inline-block"
                                    >
                                        <tr class="text-center">
                                            <th
                                                scope="col"
                                                class="flex-col justify-center p-4"
                                            ></th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 flex flex-row justify-center px-3 py-6 text-xs font-medium tracking-wider text-center text-white uppercase align-middle"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Check #</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 justify-center px-3 py-6 text-xs font-medium tracking-wider text-center text-white uppercase align-middle"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Transaction</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Amount</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                                            >
                                                <span
                                                    class="flex justify-center text-center"
                                                    >Date</span
                                                >
                                            </th>
                                            <th
                                                scope="col"
                                                class="dark:text-gray-300 px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="dark:bg-neutral-800 dark:divide-neutral-800 bg-zinc-800 divide-y divide-gray-200"
                                    >
                                        <tr
                                            class="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            *ngFor="
                                                let statement of s2;
                                                let i = index
                                            "
                                        >
                                            <td
                                                class="whitespace-nowrap dark:text-lime-400 text-lime-400 px-6 py-4 text-sm font-medium"
                                            >
                                                {{ statement.checknumber }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-white px-6 py-4 text-sm font-medium text-gray-500"
                                            >
                                                {{ statement.transaction }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-amber-300 px-6 py-4 text-sm font-medium text-gray-900"
                                            >
                                                {{ statement.amount }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-blue-400 px-6 py-4 text-sm font-medium text-gray-500"
                                            >
                                                {{ statement.date }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap dark:text-blue-400 px-6 py-4 text-sm font-medium text-gray-500"
                                            >
                                                {{ similarityScores[i] }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class EditComponent {
    mapping: { [key: string]: any } = {};
    similarityScores: number[] = [];

    temp1: any[] = [];
    statementSubject: Subject<any> = new Subject<any>();
    statements$ = this.statementSubject.asObservable();
    statement1: Statement[] = [];
    statementLong: Statement[] = [];
    s1: Statement[] = [];
    compare1: any;
    compare2: any;
    statement2: Statement[] = [];
    s2: Statement[] = [];
    statementsChoiceSubject: Subject<Statement> = new Subject<Statement>();

    constructor(
        private csvService: CsvCompareService,
        private csvCompareService: CsvCompareService,
        private router: Router,
        private storeService: StoreService
    ) {}

    ngOnInit(): void {
        this.storeService.setS1andS2();

        this.storeService.s1$.subscribe((data: Statement[]) => {
            this.statement1 = data;
        });
        this.storeService.s2$.subscribe((data: Statement[]) => {
            this.statement2 = data;
        });
        console.log(this.statement1);
        console.log(this.statement2);

        this.compareStatements2();
    }
    compareStatements() {
        const isSameUser = (a: any, b: any) => a.checknumber === b.checknumber;
        // using the compareFunction to determine equality.
        const onlyInLeft = (
            statement1: any,
            statement2: any,
            compareFunction: any
        ) =>
            statement1.filter(
                (s1: any) =>
                    !statement2.some((s2: any) => compareFunction(s1, s2))
            );

        this.s1 = onlyInLeft(this.statement1, this.statement2, isSameUser);
        this.s2 = onlyInLeft(this.statement2, this.statement1, isSameUser);
        console.log(this.s1);
        console.log(this.s2);
    }

    compareStatements2() {
        for (let z = 0; z < this.statement1.length; z++) {
            const removed = this.statement1[z].checknumber.replace(
                'Check ',
                ''
            );
            this.statement1[z].checknumber = removed;
	  }
	  for(let z = 0; z < this.statement2.length; z++) {
		if(this.statement2[z].date[0] === '0') {
			this.statement2[z].date = this.statement2[z].date.substring(1)
		}
	  }

        for (let i = 0; i < this.statement1.length; i++) {
            for (let c = 0; c < this.statement2.length; c++) {
                if (
                    this.statement1[i].checknumber ===
                        this.statement2[c].checknumber &&
                    this.statement1[i].checked !== true &&
                    this.statement2[c].checked !== true
                ) {
                    this.statement1[i].checked = true;
                    this.statement2[c].checked = true;
                }
            }
        }
        for (let i = 0; i < this.statement1.length; i++) {
            for (let c = 0; c < this.statement2.length; c++) {
                if (
                    this.statement1[i].amount === this.statement2[c].amount &&
                    this.statement1[i].checked !== true &&
                    this.statement2[c].checked !== true
                ) {
                    this.statement1[i].checked = true;
                    this.statement2[c].checked = true;
                }
            }
        }
        for (let i = 0; i < this.statement1.length; i++) {
            for (let c = 0; c < this.statement2.length; c++) {
                if (
                    this.statement1[i].date === this.statement2[c].date &&
                    this.statement1[i].checked !== true &&
                    this.statement2[c].checked !== true
                ) {
                    this.statement1[i].checked = true;
                    this.statement2[c].checked = true;
                }
            }
        }

        		for (let i = 0; i < this.statement1.length; i++) {
           		 if (this.statement1[i].checked === false) {
               	 this.s1.push(this.statement1[i]);
          	  }
			}
            for (let i = 0; i < this.statementLong.length; i++) {
                if (this.statementLong[i].checked === false) {
                    this.s1.push(this.statementLong[i]);
                }
            }

            console.log(this.s1);
            for (let i = 0; i < this.statement2.length; i++) {
                if (this.statement2[i].checked === false) {
                    this.s2.push(this.statement2[i]);
                }
            }

            this.storeService.setDataExport(this.s1, this.s2);
        }
}
