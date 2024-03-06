import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { FormDyerItemHistoryReportWdComponent } from 'src/app/main/wd/reports/form-dyer-item-history-report-wd/form-dyer-item-history-report-wd.component';

export const routes: Routes = [

    {

        path: '', component: FormDyerItemHistoryReportWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FormDyerItemHistoryReportWdModuleRoutingModule { }
