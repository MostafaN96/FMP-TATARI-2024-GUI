import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {

  resultSupplier:any;

// Form Group
warehouseForm:FormGroup = new FormGroup({
  name: new FormControl('',[Validators.required,Validators.pattern(this.patterns.validator_pattern.shortText)]),
  storekeeperName: new FormControl('',[Validators.pattern(this.patterns.validator_pattern.shortText)]),
  phone: new FormControl('',[Validators.pattern(this.patterns.validator_pattern.number)]),
  address: new FormControl('',[Validators.pattern(this.patterns.validator_pattern.longText)]),
  isStock: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  isGrade: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
  ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
})

constructor(
  private _WarehouseService: WarehouseService,
  private _SupplierService: BussinessmanService,
  public matcher: MyErrorStateMatcher,
  public _sharedComponentService: SharedComponentService,
  private _constantsService: ConstantsService,
  private patterns: ValidatorPatternService,
  private _sessionManagerService: SessionManagerService,
) {
  this._sharedComponentService.configRouterReloadPage()
}

ngOnInit(): void {
  this._SupplierService.selectAll().subscribe((response: any) =>{
    this.resultSupplier = response;
  });
  
}

onAddWarehouse(){
  if (this.warehouseForm.valid) {
    this._WarehouseService.add(this.warehouseForm.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg === "data inserted") {
        this._constantsService.successAddMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        if (response.msg === "duplicated data") {
          this._constantsService.duplicateDataErrorMessage()
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }
    });
  }    

 }


}
