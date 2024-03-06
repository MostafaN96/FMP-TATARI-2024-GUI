import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { ImageFabricScannerDialogComponent } from 'src/app/main/we/image-fabric-scanner-dialog/image-fabric-scanner-dialog.component';

export const routes: Routes = [

    {

        path: '', component: ImageFabricScannerDialogComponent,
 
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ImageFabricScannerDialogModuleRoutingModule { }
