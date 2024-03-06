import { NgModule } from '@angular/core';

import { UpdateFormFabricYarnsModuleRoutingModule } from './update-form-fabric-yarns-module-routing.module';

// Component
import { UpdateFormFabricYarnsComponent } from 'src/app/main/fabric/update-form-fabric-yarns/update-form-fabric-yarns.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Shared Components
import { AddDetailsFormFabricYarnsComponent } from 'src/app/main/fabric/add-details-form-fabric-yarns/add-details-form-fabric-yarns.component';

@NgModule({
  declarations: [
    UpdateFormFabricYarnsComponent,
    AddDetailsFormFabricYarnsComponent
  ],
  imports: [
    SharedModule,
    UpdateFormFabricYarnsModuleRoutingModule
  ]
})
export class UpdateFormFabricYarnsModuleModule { }
