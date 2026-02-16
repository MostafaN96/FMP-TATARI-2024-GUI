import { NgModule } from '@angular/core';

// Routing Module
import { UpdateReportWcModuleRoutingModule } from './update-report-wc-module-routing.module';


// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    UpdateReportWcModuleRoutingModule
  ]
})
export class UpdateReportWcModuleModule { }
