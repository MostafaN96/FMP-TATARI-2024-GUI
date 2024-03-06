import { NgModule } from '@angular/core';

// Routing Module
import { YarnLotAddModuleRoutingModule } from './yarn-lot-add-module-routing.module';

// Component
import { YarnLotAddComponent } from 'src/app/main/yarn-lot/yarn-lot-add/yarn-lot-add.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    YarnLotAddComponent
  ],
  imports: [
    SharedModule,
    YarnLotAddModuleRoutingModule
  ]
})
export class YarnLotAddModuleModule { }
