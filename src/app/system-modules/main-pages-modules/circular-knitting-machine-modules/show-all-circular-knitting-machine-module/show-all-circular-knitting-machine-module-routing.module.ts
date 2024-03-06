import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ShowAllCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/show-all-circular-knitting-machine/show-all-circular-knitting-machine.component';

export const routes: Routes = [

    {

        path: '', component: ShowAllCircularKnittingMachineComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ShowAllCircularKnittingMachineModuleRoutingModule { }
