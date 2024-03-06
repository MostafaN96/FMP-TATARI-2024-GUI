import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllConsigmentYarnModuleRoutingModule } from './show-all-consigment-yarn-module-routing.module';

// Component
import { ShowAllConsigmentYarnComponent } from 'src/app/main/consigment-yarn/show-all-consigment-yarn/show-all-consigment-yarn.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateConsigmentYarnComponent } from 'src/app/main/consigment-yarn/update-consigment-yarn/update-consigment-yarn.component';

@NgModule({
  declarations: [
    ShowAllConsigmentYarnComponent,
    UpdateConsigmentYarnComponent
  ],
  imports: [
    SharedModule,
    ShowAllConsigmentYarnModuleRoutingModule
  ]
})
export class ShowAllConsigmentYarnModuleModule { }
