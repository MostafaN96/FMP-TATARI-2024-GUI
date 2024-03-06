import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllTransitionBetweenDyersWdComponent } from '../../../../../main/wd/transition-between-dyers-wd/show-all-transition-between-dyers-wd/show-all-transition-between-dyers-wd.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllTransitionBetweenDyersWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllTransitionBetweenDyersWdModuleRoutingModule { }
