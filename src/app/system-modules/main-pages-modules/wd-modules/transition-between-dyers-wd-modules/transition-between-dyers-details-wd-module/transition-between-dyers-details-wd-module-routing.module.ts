import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenDyersDetailsWdComponent } from '../../../../../main/wd/transition-between-dyers-wd/transition-between-dyers-details-wd/transition-between-dyers-details-wd.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenDyersDetailsWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenDyersDetailsWdModuleRoutingModule { }
