import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvDownloadComponent } from './csvdownload/csvdownload.component';
import { CsvParserComponent } from './csvupload/csvupload.component';
import { EditComponent } from './edit/edit.component';
import { LayoutComponent } from './layout/comparison-layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: CsvParserComponent,
            },
            {
                path: 'edit',
                component: EditComponent
            },
		  {
			path: 'csvdownload',
		     component: CsvDownloadComponent
		}
        ],
    },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
     exports: [RouterModule],
})
export class ComparisonRoutingModule { }
