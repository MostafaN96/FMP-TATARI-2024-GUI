import { NgModule } from '@angular/core';

// Routing Module
import { AddYarnModuleRoutingModule } from './add-yarn-module-routing.module';

// Component
import { AddYarnComponent } from '../../../../main/yarn/add-yarn/add-yarn.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddYarnComponent
  ],
  imports: [
    SharedModule,
    AddYarnModuleRoutingModule
  ]
})
export class AddYarnModuleModule { }
