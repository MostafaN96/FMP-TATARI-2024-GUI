import { NgModule } from '@angular/core';

// Routing Module
import { RestoreYarnModuleRoutingModule } from './restore-yarn-module-routing.module';

// Component
import { RestoreYarnComponent } from '../../../../main/yarn/restore-yarn/restore-yarn.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreYarnComponent
  ],
  imports: [
    SharedModule,
    RestoreYarnModuleRoutingModule
  ]
})
export class RestoreYarnModuleModule { }
