import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "../../../services/main/session-manager.service";

// Call Service
import { CircularKnittingMachineService } from "src/app/services/main/circular-knitting-machine.service";

@Component({
  selector: 'app-update-circular-knitting-machine',
  templateUrl: './update-circular-knitting-machine.component.html',
  styleUrls: ['./update-circular-knitting-machine.component.css']
})
export class UpdateCircularKnittingMachineComponent implements OnInit {

  @Input() selectedData: any
  circularKnittingMachineForm:FormGroup = new FormGroup({
    fabricId: new FormControl("", [Validators.required]),
    manufactureId: new FormControl("", [Validators.required]),
    fabricCode: new FormControl(""),
    type: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    number: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    diameter: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    smoothness: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    model: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),    
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })
  
  constructor(
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _circularKnittingMachineService: CircularKnittingMachineService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.circularKnittingMachineForm.controls['fabricId'].setValue(this.selectedData?.fabric_id)
    this.circularKnittingMachineForm.controls['manufactureId'].setValue(this.selectedData?.manufacturer_id)
    this.circularKnittingMachineForm.controls['fabricCode'].setValue(this.selectedData?.fabric_code)
    this.circularKnittingMachineForm.controls['type'].setValue(this.selectedData?.type)
    this.circularKnittingMachineForm.controls['number'].setValue(this.selectedData?.number)
    this.circularKnittingMachineForm.controls['diameter'].setValue(this.selectedData?.diameter)
    this.circularKnittingMachineForm.controls['smoothness'].setValue(this.selectedData?.smoothness)
    this.circularKnittingMachineForm.controls['model'].setValue(this.selectedData?.model)
  }

  onUpdate() {
    this._constantsService.spinner.show()
    this._circularKnittingMachineService.update(this.circularKnittingMachineForm.value,this.selectedData.circular_knitting_machine_id).subscribe((response: any) =>{
      this._constantsService.spinner.hide();
      if (response.msg === "data updated") {
        this._constantsService.successUpdateMessage()
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
    })
  }
}
