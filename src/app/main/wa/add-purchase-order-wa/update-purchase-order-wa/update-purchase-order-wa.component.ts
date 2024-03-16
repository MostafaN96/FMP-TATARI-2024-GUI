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
import { AddPurchaseOrderDetailsWaService } from "src/app/services/main/wa/add-purchase-order-details-wa.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-purchase-order-wa',
  templateUrl: './update-purchase-order-wa.component.html',
  styleUrls: ['./update-purchase-order-wa.component.css']
})
export class UpdatePurchaseOrderWaComponent implements OnInit {

  requisitionId!: string;
  quantityWithWaste = 0

  @Input() selectedData: any
  manufacturingOrderWdForm: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _addPurchaseOrderDetailsWaService: AddPurchaseOrderDetailsWaService,
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
    this.manufacturingOrderWdForm.controls['date'].setValue(this.selectedData?.date)
    this.manufacturingOrderWdForm.controls['name'].setValue(this.selectedData?.order_name)
    this.manufacturingOrderWdForm.controls['note'].setValue(this.selectedData?.note)
    this.manufacturingOrderWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.manufacturingOrderWdForm.controls['note2'].setValue(this.selectedData?.note2)
  }

  onUpdate() {
    this.manufacturingOrderWdForm.markAllAsTouched();
    if (this.manufacturingOrderWdForm.valid) {
      this._constantsService.spinner.show()
      this._addPurchaseOrderDetailsWaService.update(this.manufacturingOrderWdForm.value, this.selectedData.id).subscribe((response: any) => {
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
    this._addPurchaseOrderDetailsWaService.closeOrder({}, data.id).subscribe((response: any) => {
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
  openOrder(data) {
    this._constantsService.spinner.show()
    this._addPurchaseOrderDetailsWaService.openOrder({}, data.id).subscribe((response: any) => {
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


