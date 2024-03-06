import { NgModule } from '@angular/core';

// Routing Module
import { YarnLotRestoreModuleRoutingModule } from './yarn-lot-restore-module-routing.module';

// Component
import { YarnLotRestoreComponent } from 'src/app/main/yarn-lot/yarn-lot-restore/yarn-lot-restore.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    YarnLotRestoreComponent
  ],
  imports: [
    SharedModule,
    YarnLotRestoreModuleRoutingModule
  ]
})
export class YarnLotRestoreModuleModule { }
