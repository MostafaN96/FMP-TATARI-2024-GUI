import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { TransitionBetweenWhRequisitionDetailsWaService } from "src/app/services/main/wa/transition-between-wh-requisition-details-wa.service";
import { WaService } from "src/app/services/main/wa/wa.service";
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { ConsigmentYarnService } from "src/app/services/main/consigment-yarn.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { QuantityOccurrencesValidationService } from "src/app/services/main/quantity-occurrences-validation.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-transition-between-wh-requisition-from-wa',
  templateUrl: './add-transition-between-wh-requisition-from-wa.component.html',
  styleUrls: ['./add-transition-between-wh-requisition-from-wa.component.css']
})
export class AddTransitionBetweenWhRequisitionFromWaComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addtransitionIndustriesRequisitionForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
  personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  lots: any = []
  fromConsigmentsYarns: any = []
  toConsigmentsYarns: any = []
  yarns:any = []
  fromWarehouses:any = []
  currentQuantity:any = []
  yarnsDetails:any = []
  getListYarnPrices:any = []
  listYarnPrices:any = []
  listYarnPricesDollar:any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر", "آخر سعر الرسالة"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الخيط"

  public onFilteringYarnName (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.yarns[index], query);
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
  
  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text:"code"};
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.lots[index], query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn (e: any, index)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fromConsigmentsYarns[index], query);
  }

  // --------------- to consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsToConsigmentYarn: Object = { value: "number", text:"number"};
  // set the placeholder to the AutoComplete input
  public textToConsigmentYarn: string = "الى رقم الرسالة"

  public onFilteringToConsigmentYarn (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.toConsigmentsYarns, query);
  }

  constructor(
    private _waService: WaService,
    private _consigmentYarnService: ConsigmentYarnService,
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _warehouseService: WarehouseService,
    private _transitionBetweenWhRequisitionDetailsWaService: TransitionBetweenWhRequisitionDetailsWaService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    public _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    public _sessionManagerService: SessionManagerService,
    private _reportWaService: ReportWaService,
    public _quantityOccurrencesValidationService: QuantityOccurrencesValidationService,
    private route: ActivatedRoute,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.addtransitionIndustriesRequisitionForm.controls.id.setValue(params['id'])
    })

    this._warehouseService.selectWhereInWa().subscribe((response: any) => {
      this.fromWarehouses = response
    })

    this._consigmentYarnService.selectAll().subscribe((response: any) => {
      this.toConsigmentsYarns = response
    })
  }
  

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      fromWarehouseId: new FormControl("", [Validators.required]),
      yarnId: new FormControl("", [Validators.required]),
      yarnName: new FormControl(""),
      yarnCode: new FormControl(""),
      yarnLotId: new FormControl("", [Validators.required]),
      consigmentYarnId: new FormControl(''),
      newConsigmentYarnNumber: new FormControl(''),
      fromConsigmentYarnId: new FormControl("", [Validators.required]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
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
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
    this.listYarnPricesDollar[index] = delete this.listYarnPricesDollar[index];
    this.listYarnPricesDollar.splice(index, 1);
   }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns[index].indexOf(event.itemData)

    if (this.yarns[index][indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue("")
      row.controls['fromConsigmentYarnId'].setValue("")
      row.controls['yarnId'].setValue("")
      row.controls['yarnCode'].setValue("")
      row.controls['quantity'].setValue("")
      row.controls['yarnName'].setValue("")
      this.currentQuantity[index] = 0
      this.lots[index] = []
    }
    else {
      let flag = true
      row.controls['yarnCode'].setValue(event.itemData.code)
      row.controls['yarnName'].setValue(event.itemData.name)

      this._yarnLotService.selectByWarehouseByYarnWa(
        row.controls['fromWarehouseId'].value!,
        event.itemData.id
        ).subscribe((response: any) => {
        this.lots[index] = response
        console.log(this.lots);
        
        if(this.lots[0] != null) {
          row.controls['yarnLotId'].setValue(this.lots[0].id)
          this.getSelectConsigmentYarnQuantityByYarnByWarehouseByLotWb(
            row.controls['fromWarehouseId'].value!,
            event.itemData.id,
            this.lots[0].id,
            index
          )
        }
      })

      for (let i = 0; i < this.addtransitionIndustriesRequisitionForm.controls.items['controls'].length; i++) {
        if(this.addtransitionIndustriesRequisitionForm.controls.items['controls'][i].value.yarnId?.includes(event.itemData.id)) {
          row.controls['yarnLotId'].setValue("")
          row.controls['yarnId'].setValue("")
          row.controls['yarnCode'].setValue("")
          row.controls['yarnName'].setValue("")
          row.controls['quantity'].setValue("")
          this.currentQuantity[index] = 0
          flag = false
        }
      }
      if(flag) {
        row.controls['yarnId'].setValue(event.itemData.id)
        row.controls['yarnCode'].setValue(event.itemData.code)
        row.controls['yarnName'].setValue(event.itemData.name)
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


  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots[index].indexOf(event.itemData)
    if (this.lots[index][indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      row.controls['fromConsigmentYarnId'].setValue("")
      this.currentQuantity[index] = 0
    } else {
      this.getSelectConsigmentYarnQuantityByYarnByWarehouseByLotWb(
        row.controls['fromWarehouseId'].value!,
        row.controls['yarnId'].value!,
        event.itemData.id,
        index
      )
    }
  }

  getSelectConsigmentYarnQuantityByYarnByWarehouseByLotWb(warehouseId: string, yarnId: string, lotId:string, index) {
    this._waService.selectRemainingByWarehouseByYarnByLotWa(
      warehouseId, 
      yarnId,
      lotId
      ).subscribe((response: any) => {
        this.fromConsigmentsYarns[index] = response
      })
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.fromConsigmentsYarns[index].indexOf(event.itemData)
    if (this.fromConsigmentsYarns[index][indexData] !== event.itemData) {
      row.controls['fromConsigmentYarnId'].setValue("")
      row.controls['validQuantity'].setValue("")
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)

      row.controls['consigmentYarnId'].setValue(event.itemData.id)
      row.controls['newConsigmentYarnNumber'].setValue(event.itemData.number)
      
      // Get Prices
      this._reportWaService.selectPriceWa(row.controls['yarnId'].value, event.itemData.id).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails), this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price, this.yarnsDetails[0].latest_consigment_price]
        this.listYarnPricesDollar[index] = [this._sharedComponentService.getAvgPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this._sharedComponentService.getAvgInputesPriceDynamic(this.yarnsDetails, 'quantity', 'price_dollar'), this.yarnsDetails[0].latest_price_dollar, this.yarnsDetails[0].latest_consigment_price_dollar]
        row.controls['price'].setValue(this.yarnsDetails[0].latest_price)
        row.controls['priceDollar'].setValue(this.yarnsDetails[0].latest_price_dollar)
      })
    }    
  }
  // End Consigment Yarn Autocomplete Section

  //  From Warehouses
  selectFromWarehouse(event: { itemData: any; }, row: FormGroup, index: number) {
    if(!this.fromWarehouses.includes(event.itemData)) {
      row.controls['fromWarehouseId'].setValue("")
      this.yarns[index] = []
    }
    else {
      this._yarnService.selectByWarehouseWa(event.itemData?.id).subscribe((response: any) => {
        this.yarns[index] = response
      })
  
    }
  }

  // Start to Consigment Yarn Autocomplete Section
  //  to Consigment Yarn
  selectToConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.toConsigmentsYarns.indexOf(event.itemData)
    if (this.toConsigmentsYarns[indexData] == event.itemData) {
      row.controls['consigmentYarnId'].setValue(event.itemData.id)
    } else {
      row.controls['consigmentYarnId'].setValue("")
    }
  }
  // End to Consigment Yarn Autocomplete Section

  // price
  changePrice(type, row: FormGroup) {
    if(type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onAddTransitionIndustriesRequisition() {
    this.addtransitionIndustriesRequisitionForm.markAllAsTouched();
    if (this.addtransitionIndustriesRequisitionForm.valid) {
      if (this._quantityOccurrencesValidationService.validateCurrentQuantity(
        this.addtransitionIndustriesRequisitionForm.controls.items.value, this.addtransitionIndustriesRequisitionForm.controls.items.value, 
        'fromConsigmentYarnId', 'fromConsigmentYarnId', 
        'yarnLotId', 'yarnLotId', 
        'yarnId', 'yarnId', 
        'quantity', 'yarnName', 'validQuantity')) {
      this._constantsService.spinner.show()
      this._transitionBetweenWhRequisitionDetailsWaService.add(this.addtransitionIndustriesRequisitionForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[167]}`, { id: response.id });
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

