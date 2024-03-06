import { NgModule } from '@angular/core';

// Components
import { FormFabricYarnsComponent } from 'src/app/main/fabric/form-fabric-yarns/form-fabric-yarns.component';

// Shared Module
import { SharedModule } from '../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    FormFabricYarnsComponent
],
  imports: [
    SharedModule
  ],
  exports: [
    // Components
    FormFabricYarnsComponent
  ]
})
export class FabricSharedComponentModule { }
