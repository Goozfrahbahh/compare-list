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

@Component({
    selector: 'app-edit',
    template: `
        <div class="h-full min-w-full mx-auto mt-10">
            <div class="flex flex-col mt-20">
                <div class="sm:rounded-lg max-h-[80vh]shadow-md">
                    <div
                        class="inline-block min-w-full align-middle justify-center"
                    >
                        <div class="overflow-y-hidden grid grid-flow-col">
                            <div class="grid overflow-y-scroll">
                                <table
                                    class="grid dark:grid dark:divide-gray-700 drop-shadow-2xl justify-center align-middle divide-y divide-gray-200 table-auto "
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
                                            (click)="onRowClick1(statement)"
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
                                            (click)="onRowClick2(statement)"
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
    s1: Statement[] = [];
    compare1: any;
    compare2: any;
    statement2: Statement[] = [];
    s2: Statement[] = [];
    statement1Subject: Subject<Statement> = new Subject<Statement>();
    statement2Subject: Subject<Statement> = new Subject<Statement>();
    statementsChoiceSubject: Subject<Statement> = new Subject<Statement>();

    constructor(
        private csvService: CsvCompareService,
        private csvCompareService: CsvCompareService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.csvCompareService.statement1Subject.subscribe(
            (value) => (this.statement1 = value)
        );
        this.csvCompareService.statement2Subject.subscribe(
            (value) => (this.statement2 = value)
        );
        this.compareStatements();

        console.log(this.s1);
        console.log(this.s2);
    }
    removeIfFound(statements: any) {
        alert('Are you sure about these two');
        for (let i = 0; i < statements.length - 1; i++) {
            this.compare1 = this.s1[i];
            this.compare2 = this.s2[i];
        }
        this.s1 = this.statement1.filter(
            (statement) => statement !== this.compare1
        );
        this.s2 = this.statement2.filter(
            (statement) => statement !== this.compare2
        );
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
    onRowClick1(data: Statement) {
        this.statement1Subject.next(data);
    }
    onRowClick2(data: Statement) {
        this.statement2Subject.next(data);
    }
}
