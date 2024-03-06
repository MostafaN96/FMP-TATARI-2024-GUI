import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { TransitionBetweenIndustriesDetailsWbComponent } from 'src/app/main/wb/transition-between-industries-wb/transition-between-industries-details-wb/transition-between-industries-details-wb.component';

export const routes: Routes = [

    {

        path: '', component: TransitionBetweenIndustriesDetailsWbComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TransitionBetweenIndustriesDetailsWbModuleRoutingModule { }
