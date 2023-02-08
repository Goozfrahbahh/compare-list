import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-upload',
    template: `
        <form [formGroup]="headerForm" (ngSubmit)="onSubmit()">
            <label>
                Select header:
                <select formControlName="header1">
                    <option *ngFor="let header of headers" [value]="header">
                        {{ header }}
                    </option>
                </select>
            </label>
            <br />
            <label>
                Select header:
                <select formControlName="header2">
                    <option *ngFor="let header of headers" [value]="header">
                        {{ header }}
                    </option>
                </select>
            </label>
            <br />
            <label>
                Select header:
                <select formControlName="header3">
                    <option *ngFor="let header of headers" [value]="header">
                        {{ header }}
                    </option>
                </select>
            </label>
            <br />
            <label>
                Select header:
                <select formControlName="header4">
                    <option *ngFor="let header of headers" [value]="header">
                        {{ header }}
                    </option>
                </select>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    `,
})
export class HeaderFormComponent {
    headerForm: FormGroup;
    headers: string[] = [];

    constructor(private formBuilder: FormBuilder) {
        this.headerForm = this.formBuilder.group({
            header1: [''],
            header2: [''],
            header3: [''],
            header4: [''],
        });
    }
    get form() {
	     return this.headerForm.controls;
    }

    onSubmit() {
        // Get the selected headers from the form
        const header1 = this.form[ 'header1' ].value;
        const header2 = this.form['header2'].value;
        const header3 = this.form['header3'].value;
        const header4 = this.form['header4'].value;

	    this.headers = [header1, header2, header3, header4];

        // Use the selected headers to map the data from the CSV file to your model
        // ..
    }
}
