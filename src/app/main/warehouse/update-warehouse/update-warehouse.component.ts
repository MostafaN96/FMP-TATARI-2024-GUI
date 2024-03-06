import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})
export class UpdateWarehouseComponent implements OnInit {


  @Input() selectedData: any
  warehouseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    storekeeperName: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
    phone: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    address: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    isStock: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
    isGrade: new FormControl(0,[Validators.pattern(this.patterns.validator_pattern.number)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _warehouseService: WarehouseService,
    private _sessionManagerService: SessionManagerService,
    private _constantsService: ConstantsService,

  ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.warehouseForm.controls['name'].setValue(this.selectedData?.name)
    this.warehouseForm.controls['phone'].setValue(this.selectedData?.phone)
    this.warehouseForm.controls['address'].setValue(this.selectedData?.address)
    this.warehouseForm.controls['storekeeperName'].setValue(this.selectedData?.storekeeper_name)
    this.warehouseForm.controls['isStock'].setValue(this.selectedData?.is_stock)
    this.warehouseForm.controls['isGrade'].setValue(this.selectedData?.is_grade)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._warehouseService.update(this.warehouseForm.value, this.selectedData.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPage();
      }
      else {
        if (response.msg == "duplicated data") {
          this._constantsService.duplicateDataErrorMessage()
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }
    })
  }
}
