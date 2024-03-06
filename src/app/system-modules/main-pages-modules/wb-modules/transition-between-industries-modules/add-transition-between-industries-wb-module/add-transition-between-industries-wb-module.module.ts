import { NgModule } from '@angular/core';

// Routing Module
import { AddTransitionBetweenIndustriesWbModuleRoutingModule } from './add-transition-between-industries-wb-module-routing.module';

// Component
import { AddTransitionBetweenIndustriesWbComponent } from '../../../../../main/wb/transition-between-industries-wb/add-transition-between-industries-wb/add-transition-between-industries-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    AddTransitionBetweenIndustriesWbComponent
  ],
  imports: [
    SharedModule,
    AddTransitionBetweenIndustriesWbModuleRoutingModule
  ]
})
export class AddTransitionBetweenIndustriesWbModuleModule { }
