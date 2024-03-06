import { NgModule } from '@angular/core';

// Routing Module
import { TransitionBetweenDyersDetailsWdModuleRoutingModule } from './transition-between-dyers-details-wd-module-routing.module';

// Component
import { TransitionBetweenDyersDetailsWdComponent } from 'src/app/main/wd/transition-between-dyers-wd/transition-between-dyers-details-wd/transition-between-dyers-details-wd.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';

// Import Child Component
import { UpdateTransitionBetweenDyersWdComponent } from 'src/app/main/wd/transition-between-dyers-wd/update-transition-between-dyers-wd/update-transition-between-dyers-wd.component';
import { WdTransitionBetweenDyersFormAddDetailsComponent } from 'src/app/main/wd/transition-between-dyers-wd/wd-transition-between-dyers-form-add-details/wd-transition-between-dyers-form-add-details.component';

@NgModule({
  declarations: [
    TransitionBetweenDyersDetailsWdComponent,
    UpdateTransitionBetweenDyersWdComponent,
    WdTransitionBetweenDyersFormAddDetailsComponent
  ],
  imports: [
    SharedModule,
    TransitionBetweenDyersDetailsWdModuleRoutingModule
  ]
})
export class TransitionBetweenDyersDetailsWdModuleModule { }
