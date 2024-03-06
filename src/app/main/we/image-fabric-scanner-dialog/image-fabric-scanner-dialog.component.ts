import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConstantsService } from 'src/app/services/constants.service';

import { ImageFabricScannerModelService } from '../../../services/main/we/image-fabric-scanner-model.service';

@Component({
  selector: 'app-image-fabric-scanner-dialog',
  templateUrl: './image-fabric-scanner-dialog.component.html',
  styleUrls: ['./image-fabric-scanner-dialog.component.css']
})
export class ImageFabricScannerDialogComponent implements OnInit {

  base64String = ''
  imageurl: SafeUrl | undefined
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImageFabricScannerModelService ,
    private sanitizer: DomSanitizer,
    public _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {
    let TYPED_ARRAY = new Uint8Array(this.data.imageSrc['data']);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
    this.base64String = btoa(STRING_CHAR);
    this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, ' + this.base64String);
  }

}
