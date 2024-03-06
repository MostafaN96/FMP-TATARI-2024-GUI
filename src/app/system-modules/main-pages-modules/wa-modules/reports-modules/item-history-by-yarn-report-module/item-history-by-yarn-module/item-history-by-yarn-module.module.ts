import { NgModule } from '@angular/core';

// Routing Module
import { ItemHistoryByYarnModuleRoutingModule } from './item-history-by-yarn-module-routing.module';

// Component
import { ItemHistoryByYarnComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn/item-history-by-yarn.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Child Component
import { ItemHistoryByYarnTotalWaComponent } from 'src/app/main/wa/reports/item-history-by-yarn-report/item-history-by-yarn-total-wa/item-history-by-yarn-total-wa.component';

@NgModule({
  declarations: [
    ItemHistoryByYarnComponent,
    ItemHistoryByYarnTotalWaComponent
  ],
  imports: [
    SharedModule,
    ItemHistoryByYarnModuleRoutingModule
  ]
})
export class ItemHistoryByYarnModuleModule { }
