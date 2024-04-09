import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { AddRequisitionWcService } from "src/app/services/main/wc/add-requisition-wc.service";
import { ConsigmentManufacturingService } from "src/app/services/main/consigment-manufacturing.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-add-requisition-wc',
  templateUrl: './add-add-requisition-wc.component.html',
  styleUrls: ['./add-add-requisition-wc.component.css']
})
export class AddAddRequisitionWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionWCForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    supplierId: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics:any = []
  industries:any = []
  suppliers:any = []
  warehouses:any = []
  consigments: any = []

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

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

  // --------------- Supplier --------------
  // maps the appropriate column to fields property
  public fieldsSupplier: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textSupplier: string = "المورد"


  public onFilteringSupplier (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.suppliers, query);
  }

  // --------------- Warehouse --------------
  // maps the appropriate column to fields property
  public fieldsWarehouse: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textWarehouse: string = "المخزن"

  public onFilteringWarehouse (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.warehouses, query);
  }

  // --------------- Consigment --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "id", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigment(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigments, query);
  }

  constructor(
    private _warehouseService: WarehouseService,
    private _fabricService: FabricService,
    private _supplierService: BussinessmanService,
    private _addRequisitionWcService: AddRequisitionWcService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _consigmentManufacturingService: ConsigmentManufacturingService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })

    this._supplierService.selectSupplier().subscribe((response: any) => {
      this.suppliers = response
    })

    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })
    
    this._consigmentManufacturingService.selectAll().subscribe((response: any) => {
      this.consigments = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      warehouseId: new FormControl(this._constantsService.DEFAULT_WC_WAREHOUSE_ID, [Validators.required]),
      fabricId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(""),
      consigmentManufacturingId: new FormControl(""),
      isNewConsigment: new FormControl(false, [Validators.required]),
      consigmentNumber: new FormControl(""),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      numberFabricPieces: new FormControl('0', [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addRequisitionWCForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.addRequisitionWCForm.get('items');
    control.removeAt(index);
   }

   //  Fabric
  selectFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      row.controls['fabricId'].setValue(null)
      row.controls['fabricCode'].setValue(null)
    }
    else {
      row.controls['fabricCode'].setValue(index.itemData.code)
    }    
  }

  //  Supplier
  selectSupplier(event: { itemData: any; }) {
    if (!this.suppliers.includes(event.itemData)) {
      this.addRequisitionWCForm.controls['supplierId'].setValue(null)
    }
  }

  //  Warehouse
  selectWarehouse(event: { itemData: any; }, row: FormGroup) {
    if (!this.warehouses.includes(event.itemData)) {
      row.controls['warehouseId'].setValue("")
    }
  }

  //  consigmentManufacturing
  selectConsigment(event: { itemData: any; }, row: FormGroup) {
    let indexData = this.consigments.indexOf(event.itemData)
    if (this.consigments[indexData] !== event.itemData) {
      row.controls['consigmentManufacturingId'].setValue("")
    }
  }

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue("0")
    } else if (type == "priceDollar") {
      row.controls['price'].setValue("0")
    }
  }
  
  async onAddRequisitionWC(){
    this.addRequisitionWCForm.markAllAsTouched();
    if (this.addRequisitionWCForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addRequisitionWCForm, 'items',
        ['fabricCode'])
    this._constantsService.spinner.show()
      this._addRequisitionWcService.add(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg === "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[34]}/details`, {id: response.id});
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
