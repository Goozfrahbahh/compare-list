import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './components/loading/loading.component';
import { LogComponent } from './components/log/log.component';

export const ExportComponents = [
	LoadingComponent,
	LogComponent
]
export const ShareImportModules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	MatIconModule,
	HttpClientModule
]

@NgModule({
	declarations: [...ExportComponents],
	exports: [...ExportComponents, ...ShareImportModules],
	imports: [...ShareImportModules],
})
export class ShareModule { }
