import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenIndustriesDetailsWbModuleRoutingModule } from './transition-between-industries-details-wb-module-routing.module';

// Component
import { TransitionBetweenIndustriesDetailsWbComponent } from 'src/app/main/wb/transition-between-industries-wb/transition-between-industries-details-wb/transition-between-industries-details-wb.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateTransitionBetweenIndustriesWbComponent } from 'src/app/main/wb/transition-between-industries-wb/update-transition-between-industries-wb/update-transition-between-industries-wb.component';
import { AddTransitionBetweenIndustriesFormWbComponent } from 'src/app/main/wb/transition-between-industries-wb/add-transition-between-industries-form-wb/add-transition-between-industries-form-wb.component';

@NgModule({
  declarations: [
    TransitionBetweenIndustriesDetailsWbComponent,
    UpdateTransitionBetweenIndustriesWbComponent,
    AddTransitionBetweenIndustriesFormWbComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenIndustriesDetailsWbModuleRoutingModule
  ]
})
export class TransitionBetweenIndustriesDetailsWbModuleModule { }
