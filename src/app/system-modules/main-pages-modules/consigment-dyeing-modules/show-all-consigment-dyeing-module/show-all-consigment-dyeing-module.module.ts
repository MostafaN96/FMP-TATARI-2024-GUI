import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowAllConsigmentDyeingModuleRoutingModule } from './show-all-consigment-dyeing-module-routing.module';

// Component
import { ShowAllConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/show-all-consigment-dyeing/show-all-consigment-dyeing.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateConsigmentDyeingComponent } from 'src/app/main/consigment-dyeing/update-consigment-dyeing/update-consigment-dyeing.component';

@NgModule({
  declarations: [
    ShowAllConsigmentDyeingComponent,
    UpdateConsigmentDyeingComponent
  ],
  imports: [
    SharedModule,
    ShowAllConsigmentDyeingModuleRoutingModule
  ]
})
export class ShowAllConsigmentDyeingModuleModule { }
