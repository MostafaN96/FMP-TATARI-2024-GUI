import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddDyeingOrderWdComponent } from 'src/app/main/wd/dyeing-order-wd/add-dyeing-order-wd/add-dyeing-order-wd.component';

export const routes: Routes = [

    {

        path: '', component: AddDyeingOrderWdComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddDyeingOrderWdModuleRoutingModule { }
