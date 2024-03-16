import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from '../../../../services/validator-pattern.service';
import { MyErrorStateMatcher } from '../../../../services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "../../../../services/shared-component.service";
import { ConstantsService } from "../../../../services/constants.service";
import { SessionManagerService } from "../../../../services/main/session-manager.service";

// Call Service
import { DyeingOrderDetailsWdService } from "../../../../services/main/wd/dyeing-order-details-wd.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-dyeing-order-wd',
  templateUrl: './update-dyeing-order-wd.component.html',
  styleUrls: ['./update-dyeing-order-wd.component.css']
})
export class UpdateDyeingOrderWdComponent implements OnInit {

  requisitionId!: string;
  quantityWithWaste = 0

  @Input() selectedData: any
  dyeingOrderWdForm: FormGroup = new FormGroup({
    sellerId: new FormControl("", [Validators.required]),
    colorCategoryId: new FormControl("", [Validators.required]),
    colorId: new FormControl("", [Validators.required]),
    colorCode: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    note: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricWidth: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    detailsNote: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _dyeingOrderDetailsWdService: DyeingOrderDetailsWdService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })
  }

  ngOnChanges() {
    this.dyeingOrderWdForm.controls['sellerId'].setValue(this.selectedData?.seller_id)
    this.dyeingOrderWdForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
    this.dyeingOrderWdForm.controls['colorId'].setValue(this.selectedData?.color_id)
    this.dyeingOrderWdForm.controls['colorCode'].setValue(this.selectedData?.color_code)
    this.dyeingOrderWdForm.controls['date'].setValue(this.selectedData?.date)
    this.dyeingOrderWdForm.controls['name'].setValue(this.selectedData?.order_name)
    this.dyeingOrderWdForm.controls['note'].setValue(this.selectedData?.note)
    this.dyeingOrderWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.dyeingOrderWdForm.controls['fabricWidth'].setValue(this.selectedData?.fabric_width)
    this.dyeingOrderWdForm.controls['fabricQuantityM2'].setValue(this.selectedData?.fabric_quantity_m2)
    this.dyeingOrderWdForm.controls['detailsNote'].setValue(this.selectedData?.details_note)
  }

  onUpdate() {
this.dyeingOrderWdForm.markAllAsTouched();
    if (this.dyeingOrderWdForm.valid) {
    this._constantsService.spinner.show()
    this._dyeingOrderDetailsWdService.update(this.dyeingOrderWdForm.value, this.selectedData.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPageWithParams(this.requisitionId);
      }
      else {
        if (response.msg == "quantity is wrong") {
          this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }
    })
    }
  }

  closeOrder(data) {
    this._constantsService.spinner.show()
    this._dyeingOrderDetailsWdService.closeOrder({}, data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPageWithParams(this.requisitionId);
      }
      else {
        // if (res.message === 'quantity is wrong') {
        //   this._constantsService.invalidInventoryQuantityErrorMessage(res.spentQuantity, res.newQuantity)
        // }
        // else {
          this._constantsService.userErrorMessage()
        // }

      }
    })
  }
  openOrder(data) {
    
    this._constantsService.spinner.show()
    this._dyeingOrderDetailsWdService.openOrder({}, data.id).subscribe((response: any) => {
      this._constantsService.spinner.hide();
      if (response.msg == "data updated") {
        this._constantsService.successUpdateMessage()
        this._sharedComponentService.reloadPageWithParams(this.requisitionId);
      }
      else {
        if (response.msg == "quantity is wrong") {
          this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
        }
        else {
          this._constantsService.userErrorMessage()
        }
      }
    })
  }

}
