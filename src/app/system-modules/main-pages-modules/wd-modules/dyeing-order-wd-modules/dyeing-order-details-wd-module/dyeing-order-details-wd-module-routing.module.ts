import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { DyeingOrderDetailsWdComponent } from 'src/app/main/wd/dyeing-order-wd/dyeing-order-details-wd/dyeing-order-details-wd.component';

export const routes: Routes = [

    {

        path: '', component: DyeingOrderDetailsWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DyeingOrderDetailsWdModuleRoutingModule { }
