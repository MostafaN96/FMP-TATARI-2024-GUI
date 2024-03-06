import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoreConsigmentDyeingModuleRoutingModule } from './restore-consigment-dyeing-module-routing.module';

// Component
import { RestoreConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/restore-consigment-dyeing/restore-consigment-dyeing.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    RestoreConsigmentDyeingComponent
  ],
  imports: [
    SharedModule,
    RestoreConsigmentDyeingModuleRoutingModule
  ]
})
export class RestoreConsigmentDyeingModuleModule { }
