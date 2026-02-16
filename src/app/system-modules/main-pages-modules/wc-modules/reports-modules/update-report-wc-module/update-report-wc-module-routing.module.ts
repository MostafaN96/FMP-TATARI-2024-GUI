import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { UpdateReportWcComponent } from 'src/app/main/wc/reports/update-report-wc/update-report-wc.component';

export const routes: Routes = [
  {
    path: '',
    component: UpdateReportWcComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateReportWcModuleRoutingModule { }
