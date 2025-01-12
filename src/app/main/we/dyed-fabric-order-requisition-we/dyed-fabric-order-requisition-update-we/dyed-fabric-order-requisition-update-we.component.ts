import { Component, Input, OnInit } from '@angular/core';

// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { DyedFabricOrderRequisitionDetailsWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-details-we.service";
import { ActivatedRoute } from '@angular/router';

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dyed-fabric-order-requisition-update-we',
  templateUrl: './dyed-fabric-order-requisition-update-we.component.html',
  styleUrls: ['./dyed-fabric-order-requisition-update-we.component.css']
})
export class DyedFabricOrderRequisitionUpdateWeComponent implements OnInit {

  requisitionId!: string;
  quantityWithWaste = 0
  dyedFabrics: any = []

  @Input() selectedData: any
  manufacturingOrderWdForm: FormGroup = new FormGroup({
    date: new FormControl("", [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    wasteRatio: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    dyedFabricId: new FormControl("", [Validators.required]),
    sellerId: new FormControl("", [Validators.required]),
    fabricWidth: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  // --------------- Dyed Fabric --------------
  // maps the appropriate column to fields property
  public fieldsDyedFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyedFabric: string = "نوع القماش الجاهز"

  public onFilteringDyedFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyedFabrics, query);
  }

  constructor(
    private route: ActivatedRoute,
    private patterns: ValidatorPatternService,
    public _sharedComponentService: SharedComponentService,
    public matcher: MyErrorStateMatcher,
    private _dyedFabricOrderRequisitionDetailsWeService: DyedFabricOrderRequisitionDetailsWeService,
    private _constantsService: ConstantsService,
    private _sessionManagerService: SessionManagerService,
    private _fabricService: FabricService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })

      
    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.dyedFabrics = response
    })
  }

  ngOnChanges() {
    this.manufacturingOrderWdForm.controls['date'].setValue(this.selectedData?.date)
    this.manufacturingOrderWdForm.controls['name'].setValue(this.selectedData?.order_name)
    this.manufacturingOrderWdForm.controls['note'].setValue(this.selectedData?.note)
    this.manufacturingOrderWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.manufacturingOrderWdForm.controls['wasteRatio'].setValue(this.selectedData?.waste_ratio)
    this.manufacturingOrderWdForm.controls['sellerId'].setValue(this.selectedData?.id)
    this.manufacturingOrderWdForm.controls['dyedFabricId'].setValue(this.selectedData?.dyed_fabric_id)
    this.manufacturingOrderWdForm.controls['fabricWidth'].setValue(this.selectedData?.fabric_width)
    this.manufacturingOrderWdForm.controls['fabricQuantityM2'].setValue(this.selectedData?.fabric_quantity_m2)
    this.manufacturingOrderWdForm.controls['price'].setValue(this.selectedData?.price)
    this.manufacturingOrderWdForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.manufacturingOrderWdForm.controls['note2'].setValue(this.selectedData?.note2)
        
    if(this.selectedData.current_quantity != this.selectedData.quantity || 
      this.selectedData.yarnOrders?.length > 0 ||
      this.selectedData.fabricOrders?.length > 0
    ) {
      this.manufacturingOrderWdForm.controls['dyedFabricId'].disable()
    } else {
      this.manufacturingOrderWdForm.controls['dyedFabricId'].enable()
    }
  }

  
  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.manufacturingOrderWdForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.manufacturingOrderWdForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.manufacturingOrderWdForm.controls['price'].setValue(this._sharedComponentService.calcEgpToDollar(this.manufacturingOrderWdForm.controls['priceDollar'].value))
    }
  }

  
  // Dyed Fabric
  selectDyedFabric(element: { itemData: any; }) {
    let indexData = this.dyedFabrics.indexOf(element.itemData)
    if (this.dyedFabrics[indexData] !== element.itemData) {
      this.manufacturingOrderWdForm.controls['dyedFabricId'].setValue(null)
    }
    else {
    }    
  }
  
  onUpdate() {
    this.manufacturingOrderWdForm.markAllAsTouched();
    if (this.manufacturingOrderWdForm.valid) {
      this._constantsService.spinner.show()
      this._dyedFabricOrderRequisitionDetailsWeService.update(this.manufacturingOrderWdForm.value, this.selectedData.id).subscribe((response: any) => {
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
    this._dyedFabricOrderRequisitionDetailsWeService.closeOrder({}, data.id).subscribe((response: any) => {
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
    this._dyedFabricOrderRequisitionDetailsWeService.openOrder({}, data.id).subscribe((response: any) => {
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



