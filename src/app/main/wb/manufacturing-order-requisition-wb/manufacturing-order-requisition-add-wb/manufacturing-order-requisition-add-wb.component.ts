import { Component, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { ManufacturingOrderRequisitionWbService } from "src/app/services/main/wb/manufacturing-order-requisition-wb.service";
import { DyeingOrderWdService } from "src/app/services/main/wd/dyeing-order-wd.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-manufacturing-order-requisition-add-wb',
  templateUrl: './manufacturing-order-requisition-add-wb.component.html',
  styleUrls: ['./manufacturing-order-requisition-add-wb.component.css']
})
export class ManufacturingOrderRequisitionAddWbComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addOrderForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    sellerId: new FormControl(null, [Validators.required]),
    orderId: new FormControl(""),
    orderName: new FormControl(""),
    items: new FormArray([
      
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  sellers: any
  fabrics: any
  requisitionsOrder: any
  fabricsOrderData: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Seller --------------
  // maps the appropriate column to fields property
  public fieldsSeller: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSeller: string = "العميل"


  public onFilteringSeller(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.sellers, query);
  }

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"

  public onFilteringFabricName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.fabrics, query);
  }

  // --------------- Requisitio nOrder --------------
  // maps the appropriate column to fields property
  public fieldsRequisitionOrderName: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textRequisitionsOrderName: string = "اسم الطلبية"


  public onFilteringRequisitionOrderName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.requisitionsOrder, query);
  }

  constructor(
    private _fabricService: FabricService,
    private _bussinessmanService: BussinessmanService,
    private _manufacturingOrderRequisitionWbService: ManufacturingOrderRequisitionWbService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
    private _dyeingOrderWdService: DyeingOrderWdService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectAll().subscribe((response: any) => {
      this.sellers = response
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })

    this._dyeingOrderWdService.selectAll('opened').subscribe((response: any) => {
      this.requisitionsOrder = response
    })
  }

  getFabricsOrderData(dyeingOrderRequisition) {

    this._manufacturingOrderRequisitionWbService.inquireFabricsByDyeingOrderForOrderWb(dyeingOrderRequisition).subscribe((response: any) => {
      this.fabricsOrderData = response
      
      this.addOrderForm.controls['name'].setValue(this.fabricsOrderData[0].dyeingOrderRequisition.order_name)
      this.addOrderForm.controls['orderId'].setValue(dyeingOrderRequisition)
      this.addOrderForm.controls['orderName'].setValue(this.fabricsOrderData[0].dyeingOrderRequisition.order_name)
      this.addOrderForm.controls['sellerId'].setValue(this.fabricsOrderData[0].dyeingOrderRequisition.seller_id)

      for (let i = 0; i < this.fabricsOrderData.length; i++) {
        const element = this.fabricsOrderData[i];

        this.addItemByData(element)
      }

    })
  }

// Initialize Form Builder
initItem() {
  return new FormGroup({
    fabricId: new FormControl("", [Validators.required]),
    fabricName: new FormControl(""),
    fabricCode: new FormControl(""),
    quantity: new FormControl(0, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  });
}

addItem() {
  const control = <FormArray>this.addOrderForm.get('items');
  control.push(this.initItem());
}

initItemByData(data) {
  return new FormGroup({
    fabricId: new FormControl(data.id, [Validators.required]),
    fabricName: new FormControl(data.name, [Validators.required]),
    fabricCode: new FormControl(data.code),
    quantity: new FormControl(data.needed_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  });
}

addItemByData(data) {
  const control = <FormArray>this.addOrderForm.get('items');
  control.push(this.initItemByData(data));
}

getItem(form: any) {    
  return form.controls.items.controls;
}

removeItem(index: number){
  const control = <FormArray>this.addOrderForm.get('items');
  control.removeAt(index);
 }

  //  Seller
  selectSeller(event: { itemData: any; }) {
    if (this.sellers.includes(event.itemData)) {
      this.addOrderForm.controls['sellerId'].setValue(event.itemData.id)
    }
    else {
      this.addOrderForm.controls['sellerId'].setValue(null)
    }
  }

  // Fabric
  selectFabric(element: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(element.itemData)
    if (this.fabrics[indexData] !== element.itemData) {
      row.controls['fabricId'].setValue("")
      row.controls['fabricName'].setValue("")
      row.controls['fabricCode'].setValue("")
    }
    else {
      row.controls['fabricName'].setValue(element.itemData.name)
      row.controls['fabricCode'].setValue(element.itemData.code)
    }    
  }

  //  Dyeing
  selectRequisitionsOrderName(event: { itemData: any; }) {
    
    if (this.requisitionsOrder.includes(event.itemData)) {
      this.addOrderForm.controls['orderId'].setValue(event.itemData.id)
      this.addOrderForm.controls['orderName'].setValue(event.itemData.name)
      this.addOrderForm.controls['name'].setValue(event.itemData.name)
      this.getFabricsOrderData(event.itemData.id)
    } else {
      this.addOrderForm.controls['orderId'].setValue("")
      this.addOrderForm.controls['orderName'].setValue("")
      this.addOrderForm.controls['name'].setValue("")
    }
  }

  async onAddRequisition() {
    this.addOrderForm.markAllAsTouched();
    if (this.addOrderForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addOrderForm, 'items',
      ['fabricCode'])
      this._constantsService.spinner.show()
      this._manufacturingOrderRequisitionWbService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[132]}/details`, { id: response.id });
          this._sharedComponentService.reloadPage();
        }
        else {
          if (response.msg == "quantity is wrong") {
            this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
          }
          else if (response.msg == "duplicated data") {
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
