import { Component, Inject, Input, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { WaAddRequisitionDetailsService } from "src/app/services/main/wa/wa-add-requisition-details.service";
import { AddPurchaseOrderDetailsWaService } from "src/app/services/main/wa/add-purchase-order-details-wa.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-details-by-order-wa',
  templateUrl: './add-details-by-order-wa.component.html',
  styleUrls: ['./add-details-by-order-wa.component.css']
})
export class AddDetailsByOrderWaComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    orderId: new FormControl('', [Validators.required]),
    items: new FormArray([

    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  @Input() selectedData: any
  yarns: any = []
  warehouses: any = []
  lots: any = []
  consigments: any = []
  requisitionsOrder: any
  yarnsOrderData: any
  isShowAdd = true

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsWarehouse: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textWarehouse: string = "المخزن"

  public onFilteringWarehouse(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.warehouses, query);
  }

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الصنف"

  public onFilteringYarnName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.yarns, query);
  }

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "code", text: "code" };
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.lots, query);
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
    private _addPurchaseOrderDetailsWaService: AddPurchaseOrderDetailsWaService,
    private _warehouseService: WarehouseService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _waAddRequisitionDetailsService: WaAddRequisitionDetailsService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.addRequisitionForm.controls['id'].setValue(params['id'])
      this.getYarnsOrderData(this.selectedData[0]['wa_add_purchase_order_id'], params['id'] )
      
})
    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response
    })

  }

  getYarnsOrderData(yarnOrderRequisition, addRequisitionDetailsId) {

    this._addPurchaseOrderDetailsWaService.yarnsOfPurchaseOrderWaNotAdded(yarnOrderRequisition, addRequisitionDetailsId).subscribe((response: any) => {
      this.yarnsOrderData = response
      
      this.addRequisitionForm.controls['orderId'].setValue(yarnOrderRequisition)

      for (let i = 0; i < this.yarnsOrderData.length; i++) {
        const element = this.yarnsOrderData[i];

        this.addItemByData(element)
      }

    })
  }

  // // Initialize Form Builder
  // initItem() {
  //   return new FormGroup({
  //     warehouseId: new FormControl(this._constantsService.DEFAULT_WA_WAREHOUSE_ID, [Validators.required]),
  //     orderDetailsId: new FormControl("", [Validators.required]),
  //     yarnId: new FormControl("", [Validators.required]),
  //     yarnCode: new FormControl(""),
  //     yarnName: new FormControl(""),
  //     yarnLotCode: new FormControl("", [Validators.required]),
  //     consigmentYarnNumber: new FormControl("", [Validators.required]),
  //     price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  //     quantity: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  //     neededQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
  //     document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
  //     statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
  //   });
  // }

  // addItem() {
  //   const control = <FormArray>this.addRequisitionForm.get('items');
  //   control.push(this.initItem());
  // }

  // Initialize Form Builder
  initItemByData(data) {
    return new FormGroup({
      warehouseId: new FormControl(this._constantsService.DEFAULT_WA_WAREHOUSE_ID, [Validators.required]),
      orderDetailsId: new FormControl(data.id, [Validators.required]),
      yarnId: new FormControl(data.yarn_id, [Validators.required]),
      yarnCode: new FormControl(data.yarn_code),
      yarnName: new FormControl(data.yarn_name),
      yarnLotCode: new FormControl("", [Validators.required]),
      consigmentYarnNumber: new FormControl("", [Validators.required]),
      price: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      neededQuantity: new FormControl(data.current_quantity, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItemByData(data) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.push(this.initItemByData(data));
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);
  }

  // Start Yarn Autocomplete Section
  //  Yarn
  selectYarn(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.yarns.indexOf(index.itemData)
    if (this.yarns[indexData] !== index.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['yarnLotCode'].setValue("")
    }
    else {
      row.controls['yarnCode'].setValue(index.itemData.code)

      this._yarnLotService.selectByYarn(index.itemData.id).subscribe((response: any) => {
        this.lots = response
        // if(this.lots[0] != null) {
        //   row.controls['yarnLotCode'].setValue(this.lots[0].code)
        // }
      })

    }
  }
  // End Yarn Autocomplete Section

  //  Warehouse
  selectWarehouse(event: { itemData: any; }, row: FormGroup) {
    if (!this.warehouses.includes(event.itemData)) {
      row.controls['warehouseId'].setValue("")
    }
  }

  async onAddDetails() {
    this.isShowAdd = false

    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid) {

      this._constantsService.spinner.show()
      this._waAddRequisitionDetailsService.addByOrder(this.addRequisitionForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.reloadPageWithParams(this.selectedData[0]['requisition_id']);

        }
        else {
          if (response.msg === "duplicated data") {
            this._constantsService.duplicateDataErrorMessage()
          }
          else {
            this._constantsService.userErrorMessage()
          }
          this.isShowAdd = true
        }
      });
    }  else {
      this.isShowAdd = true
    }
  }
}

