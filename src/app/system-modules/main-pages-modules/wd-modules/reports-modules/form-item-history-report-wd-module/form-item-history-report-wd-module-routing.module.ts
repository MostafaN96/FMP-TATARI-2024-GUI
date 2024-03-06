import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FormItemHistoryReportWdComponent } from 'src/app/main/wd/reports/form-item-history-report-wd/form-item-history-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: FormItemHistoryReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FormItemHistoryReportWdModuleRoutingModule { }
