import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreConsigmentYarnModuleRoutingModule } from './restore-consigment-yarn-module-routing.module';

// Component
import { RestoreConsigmentYarnComponent } from 'src/app/main/consigment-yarn/restore-consigment-yarn/restore-consigment-yarn.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreConsigmentYarnComponent
  ],
  imports: [
    SharedModule,
    RestoreConsigmentYarnModuleRoutingModule
  ]
})
export class RestoreConsigmentYarnModuleModule { }
