import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByYarnDetailsModuleRoutingModule } from './item-history-by-yarn-details-module-routing.module';

// Component
import { ItemHistoryByYarnDetailsComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn-details/item-history-by-yarn-details.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    ItemHistoryByYarnDetailsComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByYarnDetailsModuleRoutingModule
  ]
})
export class ItemHistoryByYarnDetailsModuleModule { }
