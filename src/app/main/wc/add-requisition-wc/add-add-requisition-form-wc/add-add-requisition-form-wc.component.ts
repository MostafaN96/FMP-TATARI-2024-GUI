import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { WcAddRequisitionDetailsService } from "src/app/services/main/wc/wc-add-requisition-details.service";
import { ConsigmentManufacturingService } from "src/app/services/main/consigment-manufacturing.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-add-requisition-form-wc',
  templateUrl: './add-add-requisition-form-wc.component.html',
  styleUrls: ['./add-add-requisition-form-wc.component.css']
})
export class AddAddRequisitionFormWcComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionWCForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics:any = []
  warehouses:any = []
  requisitionId: string = '';
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
    private _wcAddRequisitionDetailsService: WcAddRequisitionDetailsService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private route: ActivatedRoute,
    private _consigmentManufacturingService: ConsigmentManufacturingService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.addRequisitionWCForm.controls.id.setValue(params['id'])
      this.requisitionId = params['id']
    })

    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })

    this._consigmentManufacturingService.selectAll().subscribe((response: any) => {
      this.consigments = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fabricId: new FormControl(null, [Validators.required]),
      fabricCode: new FormControl(null),
      warehouseId: new FormControl("", [Validators.required]),
      consigmentManufacturingId: new FormControl(""),
      isNewConsigment: new FormControl(false, [Validators.required]),
      consigmentNumber: new FormControl(""),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),     
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),     
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
      this._wcAddRequisitionDetailsService.add(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
      if (response.msg === "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.reloadPageWithParams(this.requisitionId);
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
