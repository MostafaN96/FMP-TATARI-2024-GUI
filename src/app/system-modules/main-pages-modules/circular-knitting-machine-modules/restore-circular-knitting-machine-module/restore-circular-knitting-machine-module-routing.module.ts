import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { RestoreCircularKnittingMachineComponent } from 'src/app/main/circular-knitting-machine/restore-circular-knitting-machine/restore-circular-knitting-machine.component';

export const routes: Routes = [

    {

        path: '', component: RestoreCircularKnittingMachineComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RestoreCircularKnittingMachineModuleRoutingModule { }
