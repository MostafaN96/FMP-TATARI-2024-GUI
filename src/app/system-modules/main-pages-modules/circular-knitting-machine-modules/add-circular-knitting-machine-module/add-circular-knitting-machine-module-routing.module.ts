import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { AddCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/add-circular-knitting-machine/add-circular-knitting-machine.component';

export const routes: Routes = [

    {

        path: '', component: AddCircularKnittingMachineComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AddCircularKnittingMachineModuleRoutingModule { }
