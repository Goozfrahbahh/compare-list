import { Component } from '@angular/core';
import { DataStoreService } from '../../shared/services/data.service';

@Component({
    selector: 'app-csvdownload',
    templateUrl: './csvdownload.component.html',
    styleUrls: ['./csvdownload.component.scss'],
})
export class CsvDownloadComponent {

	constructor(private dataStore: DataStoreService) { }
    set csvData(data: any) {
		this.csvData = data;
    }
    download() {
        const newData = this.csvData
            .filter((e: any, i: any) => i !== 0)
            .map((e: any) => {
                return Object.keys(e).reduce((acc, curr) => {
                    return { ...acc, ...{ [curr]: '"' + e[curr] + '"' } };
                }, {});
            });

        console.log('newdata', this.csvData, [this.csvData['0'], ...newData]);

        this.exportFile(newData, 'Matched Data');
    }

    exportFile(rows: any, fileTitle?: any) {
        const jsonObject = JSON.stringify(rows);
        const csv = '\ufeff' + this.convertToCSV(jsonObject); // support Chinese

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileTitle || 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /* CSV: convert json to json */
    convertToCSV(objArray: any): string {
        const array =
            typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            Object.entries(array[i]).forEach(([key, value]) => {
                if (line !== '') {
                    line += ',';
                }
                line += value;
            });
            str += line + '\r\n';
        }
        return str;
    }
}
