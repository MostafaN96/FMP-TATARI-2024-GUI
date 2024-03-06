import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddConsigmentYarnModuleRoutingModule } from './add-consigment-yarn-module-routing.module';

// Component
import { AddConsigmentYarnComponent } from 'src/app/main/consigment-yarn/add-consigment-yarn/add-consigment-yarn.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddConsigmentYarnComponent
  ],
  imports: [
    SharedModule,
    AddConsigmentYarnModuleRoutingModule
  ]
})
export class AddConsigmentYarnModuleModule { }
