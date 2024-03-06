import { NgModule } from '@angular/core';

// Routing Module
import { ShowAllTransitionBetweenIndustriesWbModuleRoutingModule } from './show-all-transition-between-industries-wb-module-routing.module';

// Component
import { ShowAllTransitionBetweenIndustriesWbComponent } from '../../../../../main/wb/transition-between-industries-wb/show-all-transition-between-industries-wb/show-all-transition-between-industries-wb.component';

// Shared Module
import { SharedModule } from '../../../../../shared-modules/shared.module';

@NgModule({
  declarations: [
    ShowAllTransitionBetweenIndustriesWbComponent
  ],
  imports: [
    SharedModule,
    ShowAllTransitionBetweenIndustriesWbModuleRoutingModule
  ]
})
export class ShowAllTransitionBetweenIndustriesWbModuleModule { }
