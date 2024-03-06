import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllYarnModuleRoutingModule } from './show-all-yarn-module-routing.module';

// Component
import { ShowAllYarnComponent } from '../../../../main/yarn/show-all-yarn/show-all-yarn.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

// Import Child Component
import { UpdateYarnComponent } from '../../../../main/yarn/update-yarn/update-yarn.component';

@NgModule({
  declarations: [
    ShowAllYarnComponent,
    UpdateYarnComponent
  ],
  imports: [
    SharedModule,
    ShowAllYarnModuleRoutingModule
  ]
})
export class ShowAllYarnModuleModule { }
