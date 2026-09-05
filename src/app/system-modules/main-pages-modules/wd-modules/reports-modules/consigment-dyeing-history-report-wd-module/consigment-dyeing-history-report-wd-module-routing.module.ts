import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsigmentDyeingHistoryReportWdComponent } from 'src/app/main/wd/reports/consigment-dyeing-history-report-wd/consigment-dyeing-history-report-wd.component';

export const routes: Routes = [
    { path: '', component: ConsigmentDyeingHistoryReportWdComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsigmentDyeingHistoryReportWdModuleRoutingModule { }
