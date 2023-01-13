import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
	   outlet: "start"
    },
    {
        path: 'compare',
        loadChildren: () =>
            import('./bankcomparison/comparison.module').then(
                (m) => m.ComparisonModule
            )	
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
