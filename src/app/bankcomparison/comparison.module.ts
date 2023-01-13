import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from '../shared/share.module';
import { EditComponent } from './edit/edit.component';
import { ComparisonRoutingModule } from './comparisonrouting.module';
import { CsvDownloadComponent } from './csvdownload/csvdownload.component';
import { CsvParserComponent } from './csvupload/csvupload.component';
import { LayoutComponent } from './layout/comparison-layout.component';
import { HeaderFormComponent } from './header-form/header-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './list-scroll/list-table.component';

export const ExportComponents = [
    EditComponent,
    LayoutComponent,
    CsvParserComponent,
    ListTableComponent,
    CsvDownloadComponent,
    HeaderFormComponent,
];
export const ExportModules = [
    ShareModule,
    ComparisonRoutingModule,
];

@NgModule({
    declarations: [...ExportComponents],
    imports: [...ExportModules],
    exports: [...ExportComponents],
})
export class ComparisonModule {}
