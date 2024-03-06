import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddConsigmentDyeingModuleRoutingModule } from './add-consigment-dyeing-module-routing.module';

// Component
import { AddConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/add-consigment-dyeing/add-consigment-dyeing.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

@NgModule({
  declarations: [
    AddConsigmentDyeingComponent
  ],
  imports: [
    SharedModule,
    AddConsigmentDyeingModuleRoutingModule
  ]
})
export class AddConsigmentDyeingModuleModule { }
