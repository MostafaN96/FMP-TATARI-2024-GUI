import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllDyeingOrderWdComponent } from 'src/app/main/wd/dyeing-order-wd/show-all-dyeing-order-wd/show-all-dyeing-order-wd.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllDyeingOrderWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllDyeingOrderWdModuleRoutingModule { }
