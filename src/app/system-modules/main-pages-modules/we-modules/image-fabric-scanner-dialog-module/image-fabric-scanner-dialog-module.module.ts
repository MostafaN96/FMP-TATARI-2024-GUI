import { NgModule } from '@angular/core';

import { ImageFabricScannerDialogModuleRoutingModule } from './image-fabric-scanner-dialog-module-routing.module';

// Component
import { ImageFabricScannerDialogComponent } from 'src/app/main/we/image-fabric-scanner-dialog/image-fabric-scanner-dialog.component';

// Shared Module
import { SharedModule } from 'src/app/shared-modules/shared.module';


@NgModule({
  declarations: [
    ImageFabricScannerDialogComponent
  ],
  imports: [
    SharedModule,
    ImageFabricScannerDialogModuleRoutingModule,
  ]
})
export class ImageFabricScannerDialogModuleModule { }
