import { NgModule } from '@angular/core';

// Routing Module
import { YarnLotShowAllModuleRoutingModule } from './yarn-lot-show-all-module-routing.module';

// Component
import { YarnLotShowAllComponent } from 'src/app/main/yarn-lot/yarn-lot-show-all/yarn-lot-show-all.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { YarnLotUpdateComponent } from 'src/app/main/yarn-lot/yarn-lot-update/yarn-lot-update.component';

@NgModule({
  declarations: [
    YarnLotShowAllComponent,
    YarnLotUpdateComponent
  ],
  imports: [
    SharedModule,
    YarnLotShowAllModuleRoutingModule
  ]
})
export class YarnLotShowAllModuleModule { }
