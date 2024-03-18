import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { FabricService } from "src/app/services/main/fabric.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { TransitionBetweenWhRequisitionWcService } from "src/app/services/main/wc/transition-between-wh-requisition-wc.service";
import { WcService } from "src/app/services/main/wc/wc.service";
import { ReportWcService } from "src/app/services/main/wc/report-wc.service";
import { ConsigmentManufacturingService } from "src/app/services/main/consigment-manufacturing.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-transition-between-wh-requisition-wc',
  templateUrl: './add-transition-between-wh-requisition-wc.component.html',
  styleUrls: ['./add-transition-between-wh-requisition-wc.component.css']
})
export class AddTransitionBetweenWhRequisitionWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addtransitionIndustriesRequisitionForm = new FormGroup({
    toWarehouseId: new FormControl("", [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fromConsigmentsManufacturing: any = []
  toConsigmentsManufacturing: any = []
  fabrics:any = []
  fromWarehouses:any = []
  currentQuantity:any = []
  fabricsDetails:any = []
  getListFabricPrices:any = []
  listFabricPrices:any = []
  toWarehouses:any
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "نوع القماش"

  public onFilteringFabricName (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fabrics[index], query);
  }

  // --------------- From Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsFromWarehouse: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFromWarehouse: string = "من مخزن"


  public onFilteringFromWarehouse (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fromWarehouses, query);
  }

  // maps the appropriate column to fields property
  public fieldsToWarehouse: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textToWarehouse: string = "الى مخزن"
  public onFilteringToWarehouse (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.toWarehouses, query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentsManufacturing: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentsManufacturing (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fromConsigmentsManufacturing[index], query);
  }

  // --------------- to consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsToConsigmentManufacturing: Object = { value: "number", text:"number"};
  // set the placeholder to the AutoComplete input
  public textToConsigmentManufacturing: string = "الى رقم الرسالة"

  public onFilteringToConsigmentManufacturing (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.toConsigmentsManufacturing, query);
  }

  constructor(
    private _wcService: WcService,
    private _consigmentManufacturingService: ConsigmentManufacturingService,
    private _fabricService: FabricService,
    private _warehouseService: WarehouseService,
    private _transitionBetweenWhRequisitionWcService: TransitionBetweenWhRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWcService: ReportWcService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._warehouseService.selectWhereInWc().subscribe((response: any) => {
      this.fromWarehouses = response
    })

    this._warehouseService.selectAll().subscribe((response: any) => {
      this.toWarehouses = response
    })

    this._consigmentManufacturingService.selectAll().subscribe((response: any) => {
      this.toConsigmentsManufacturing = response
    })
  }
  

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fromWarehouseId: new FormControl("", [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricName: new FormControl(""),
      fabricCode: new FormControl(""),
      consigmentManufacturingId: new FormControl(''),
      newConsigmentManufacturingNumber: new FormControl(''),
      fromConsigmentManufacturingId: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addtransitionIndustriesRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.addtransitionIndustriesRequisitionForm.get('items');
    control.removeAt(index);

    // Price
    this.listFabricPrices[index] = delete this.listFabricPrices[index];
    this.listFabricPrices.splice(index, 1);
   }

  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics[index].indexOf(event.itemData)

    if (this.fabrics[index][indexData] !== event.itemData) {
      row.controls['fromConsigmentManufacturingId'].setValue("")
      row.controls['fabricId'].setValue("")
      row.controls['fabricCode'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['fabricName'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      let flag = true
      row.controls['fabricCode'].setValue(event.itemData.code)
      row.controls['fabricName'].setValue(event.itemData.name)
        
        if(this.fabrics[0] != null) {
          this.getSelectConsigmentManufacturingQuantityByFabricByWarehouseWc(
            row.controls['fromWarehouseId'].value!,
            event.itemData.id,
            index
          )
          }

      for (let i = 0; i < this.addtransitionIndustriesRequisitionForm.controls.items['controls'].length; i++) {
        if(this.addtransitionIndustriesRequisitionForm.controls.items['controls'][i].value.fabricId?.includes(event.itemData.id)) {
          row.controls['fabricId'].setValue("")
          row.controls['fabricCode'].setValue("")
          row.controls['fabricName'].setValue("")
          row.controls['quantity'].setValue("")
          this.currentQuantity[index] = 0
          flag = false
        }
      }
      if(flag) {
        row.controls['fabricId'].setValue(event.itemData.id)
        row.controls['fabricCode'].setValue(event.itemData.code)
        row.controls['fabricName'].setValue(event.itemData.name)
      }
    }
    this.validate(row, index)    
  }

  validate(row: FormGroup, index) {
    if(parseFloat(row.controls['quantity'].value)  > parseFloat(this.currentQuantity[index])) {
      row.controls['quantity'].setErrors({'incorrect': true});
    }
    else {
      row.controls['quantity'].setErrors({'incorrect': null});
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  getSelectConsigmentManufacturingQuantityByFabricByWarehouseWc(warehouseId: string, fabricId: string, index) {
    this._wcService.selectConsigmentManufacturingQuantityByWarehouseByFabricWc(
      warehouseId, 
      fabricId
      ).subscribe((response: any) => {
        this.fromConsigmentsManufacturing[index] = response
      })
  }

  // Start Consigment Manufacturing Autocomplete Section
  //  Consigment Manufacturing
  selectConsigmentManufacturing(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.fromConsigmentsManufacturing[index].indexOf(event.itemData)
    if (this.fromConsigmentsManufacturing[index][indexData] !== event.itemData) {
      row.controls['fromConsigmentManufacturingId'].setValue("")
      row.controls['validQuantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)

       // Get Prices
       this._reportWcService.selectPriceByFabricByConsigmentManufacturingInWc(row.controls['fabricId'].value!, event.itemData.id ).subscribe((response: any) => {
        this.fabricsDetails = response
        console.log("this._sharedComponentService.getAvgPrice(this.fabricsDetails) ?? 0 :: ", this._sharedComponentService.getAvgPrice(this.fabricsDetails) ?? 0);
        
        this.listFabricPrices[index] = [this._sharedComponentService.getAvgPrice(this.fabricsDetails) ?? 0, this._sharedComponentService.getAvgInputesPrice(this.fabricsDetails) ?? 0, this.fabricsDetails[0].latest_price ?? 0]
      })
    }    
  }
  // End Consigment Manufacturing Autocomplete Section

  //  From Warehouses
  selectFromWarehouse(event: { itemData: any; }, row: FormGroup, index: number) {
    if(!this.fromWarehouses.includes(event.itemData)) {
      row.controls['fromWarehouseId'].setValue("")
      row.controls['fabricId'].setValue("")
          row.controls['fabricCode'].setValue("")
          row.controls['fabricName'].setValue("")
          row.controls['quantity'].setValue("")
          this.currentQuantity[index] = 0
      this.fabrics[index] = []
    }
    else {
      this._fabricService.selectByWarehouseWc(event.itemData?.id).subscribe((response: any) => {
        this.fabrics[index] = response
      })
  
    }
  }

  // To Warehouse
  selectToWarehouse(event: { itemData: any; }) {
    if (!this.toWarehouses.includes(event.itemData)) {
      this.addtransitionIndustriesRequisitionForm.controls['toWarehouseId'].setValue(null)
    }
  }

  // Start to Consigment Manufacturing Autocomplete Section
  //  to Consigment Manufacturing
  selectToConsigmentManufacturing(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.toConsigmentsManufacturing.indexOf(event.itemData)
    if (this.toConsigmentsManufacturing[indexData] == event.itemData) {
      row.controls['consigmentManufacturingId'].setValue(event.itemData.id)
    } else {
      row.controls['consigmentManufacturingId'].setValue("")
    }.00
  }
  // End to Consigment Manufacturing Autocomplete Section

  async onAddTransitionIndustriesRequisition() {
    this.addtransitionIndustriesRequisitionForm.markAllAsTouched();
    if (this.addtransitionIndustriesRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantityTwoItems(
        this.addtransitionIndustriesRequisitionForm.controls.items.value, this.addtransitionIndustriesRequisitionForm.controls.items.value, 
        'fromConsigmentManufacturingId', 'fromConsigmentManufacturingId', 
        'fabricId', 'fabricId', 
        'quantity', 'fabricName', 'validQuantity')) {
      this._constantsService.spinner.show()
      this._transitionBetweenWhRequisitionWcService.add(this.addtransitionIndustriesRequisitionForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[199]}`, { id: response.id });
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

}
