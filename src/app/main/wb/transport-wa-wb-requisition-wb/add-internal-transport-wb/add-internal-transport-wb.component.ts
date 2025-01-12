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
import { WbService } from "src/app/services/main/wb/wb.service";
import { ActivatedRoute } from '@angular/router';
import { FabricService } from "src/app/services/main/fabric.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-internal-transport-wb',
  templateUrl: './add-internal-transport-wb.component.html',
  styleUrls: ['./add-internal-transport-wb.component.css']
})
export class AddInternalTransportWbComponent implements OnInit {

  requisitionId!: string;
  fabricCode:string = ""
  fabrics:any
  yarnName= ""
  isShowAdd = true

  @Input() internalSelectedData: any
  internalTransportWbForm:FormGroup = new FormGroup({
    requisitionType: new FormControl("", [Validators.required]),
    industryId: new FormControl("", [Validators.required]),
    yarnId: new FormControl("", [Validators.required]),
    yarnLotId: new FormControl("", [Validators.required]),
    yarnOrderId: new FormControl("", [Validators.required]),
    consigmentYarnId: new FormControl("", [Validators.required]),
    consigmentYarnNumber: new FormControl("", [Validators.required]),
    fromConsigmentYarnId: new FormControl(""),
    fabricToBeManufacturedId: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "القماش المراد تصنيعه"

  public onFilteringFabricName (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
         predicate = predicate.or('dyeing_code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fabrics, query);
  }
  
  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _wbService: WbService,
    private _fabricService: FabricService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,

  ) {
   }

  ngOnInit(): void {
    this.getData()
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']        
      })
  }

  ngOnChanges() {
    // console.log("this.internalSelectedData :::: ", this.internalSelectedData);
    
    this.yarnName = this.internalSelectedData.name || this.internalSelectedData.yarn_name

    this.internalTransportWbForm.controls['requisitionType'].setValue(this.internalSelectedData.requisition_type)
    this.internalTransportWbForm.controls['industryId'].setValue(this.internalSelectedData.industryId || this.internalSelectedData.manufacturer_id)
    this.internalTransportWbForm.controls['yarnId'].setValue(this.internalSelectedData.yarn_id)
    this.internalTransportWbForm.controls['yarnLotId'].setValue(this.internalSelectedData.yarn_lot_id)
    this.internalTransportWbForm.controls['yarnOrderId'].setValue(this.internalSelectedData.wa_yarn_order_requisition_id)
    this.internalTransportWbForm.controls['consigmentYarnId'].setValue(this.internalSelectedData.consigment_yarn_id)
    this.internalTransportWbForm.controls['consigmentYarnNumber'].setValue(this.internalSelectedData.consigment_yarn_number)
    this.internalTransportWbForm.controls['fromConsigmentYarnId'].setValue(this.internalSelectedData.from_consigment_yarn_id)
    this.internalTransportWbForm.controls['quantity'].setValue(String(this.internalSelectedData.current_quantity))
  }

  getData() {
    this._fabricService.selectFabricsByOrder(this.internalSelectedData.orders_requisitions_id).subscribe((response: any) => {
      this.fabrics = response
    })
  }

    //  Fabric
  selectFabric(index: { itemData: any; }) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      this.internalTransportWbForm.controls['fabricToBeManufacturedId'].setValue(null)
      this.fabricCode = ""
    }
    else {
      this.fabricCode = index.itemData.code
    }    
  }

  validate(event: any) {
    // console.log(this.internalSelectedData);
    
    if(parseFloat(event.target.value) > parseFloat(this.internalSelectedData.current_quantity)) {
      this.internalTransportWbForm.controls['quantity'].setErrors({'incorrect': true});
      this.internalTransportWbForm.controls['quantity'].markAsTouched()
    }
    else {
      this.internalTransportWbForm.controls['quantity'].setErrors({'incorrect': null});
      this.internalTransportWbForm.controls['quantity'].updateValueAndValidity()
    }
  }

  onUpdate() {
    this.isShowAdd = false

    this.internalTransportWbForm.markAllAsTouched();
    if (this.internalTransportWbForm.valid) {
      this._constantsService.spinner.show()
      this._wbService.updateFabricToBeManufacture(this.internalTransportWbForm.value, this.internalSelectedData.wb_id).subscribe((response: any) => {
        this._constantsService.spinner.hide();
        if (response.msg == "data updated") {
          this._constantsService.successUpdateMessage()
          this._sharedComponentService.reloadPageWithParams(this.requisitionId);
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.transportWaWbQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else {
            this._constantsService.userErrorMessage()
          }
          this.isShowAdd = true
        }
      })
    } else {
      this.isShowAdd = true
    }
  }
}
