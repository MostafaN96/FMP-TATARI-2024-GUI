import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { YarnLotService } from "src/app/services/main/yarn-lot.service";
import { WbService } from "src/app/services/main/wb/wb.service";
import { ReconcilitionRequisitionWbService } from "src/app/services/main/wb/reconcilition-requisition-wb.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-reconcilition-requisition-wb',
  templateUrl: './add-reconcilition-requisition-wb.component.html',
  styleUrls: ['./add-reconcilition-requisition-wb.component.css']
})
export class AddReconcilitionRequisitionWbComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  reconcilitionRequisitionWBForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    industryId: new FormControl(null, [Validators.required]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns:any = []
  lots: any = []
  fabrics:any = []
  consigmentsYarns: any = []
  currentQuantity:any = []
  industries:any = []
  yarnsDetails:any = []
  getListYarnPrices:any = []
  listYarnPrices:any = []
  groupPrices:any = ["وسطي السعر", "وسطي سعر المدخلات", "آخر سعر"]

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الخيط"

  public onFilteringYarnName (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.yarns, query);
  }

  // --------------- Industry --------------
  // maps the appropriate column to fields property
  public fieldsIndustry: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textIndustry: string = "المصنع"


  public onFilteringIndustry (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('name', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.industries, query);
  }

  // --------------- Lot --------------
  // maps the appropriate column to fields property
  public fieldsLot: Object = { value: "id", text:"code"};
  // set the placeholder to the AutoComplete input
  public textLot: string = "اللوط"

  public onFilteringLot (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.yarns, query);
  }

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
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.fabrics, query);
  }

  // --------------- consigment Yarn --------------
  // maps the appropriate column to fields property
  public fieldsConsigmentYarn: Object = { value: "id", text:"number"};
  // set the placeholder to the AutoComplete input
  public textConsigmentYarn: string = "رقم الرسالة"

  public onFilteringConsigmentYarn (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('number', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.consigmentsYarns, query);
  }

  constructor(
    private _yarnService: YarnService,
    private _yarnLotService: YarnLotService,
    private _wbService: WbService,
    private _bussinessmanService: BussinessmanService,
    private _reconcilitionRequisitionWbService: ReconcilitionRequisitionWbService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private _reportWbService: ReportWbService,
    private _fabricService: FabricService,

  ) {
    this._sharedComponentService.configRouterReloadPage()

  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectTransportedManufacturersInWb().subscribe((response: any) => {
      this.industries = response
    })

    this._fabricService.selectAll().subscribe((response: any) => {
      this.fabrics = response
    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl(null, [Validators.required]),
      yarnCode: new FormControl(null),
      yarnLotId: new FormControl(null, [Validators.required]),
      consigmentYarnId: new FormControl("", [Validators.required]),
      fabricToBeManufacturedId: new FormControl("", [Validators.required]),
      fabricCode: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      validQuantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
      inputOutput: new FormControl('1', [Validators.required]),
    });
  }

  addItem() {
    const control = <FormArray>this.reconcilitionRequisitionWBForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {    
    return form.controls.items.controls;
  }

  removeItem(index: number){
    const control = <FormArray>this.reconcilitionRequisitionWBForm.get('items');
    control.removeAt(index);

    // Price
    this.listYarnPrices[index] = delete this.listYarnPrices[index];
    this.listYarnPrices.splice(index, 1);
   }

  //  Yarn
  selectYarn(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.yarns.indexOf(event.itemData)

    if (this.yarns[indexData] !== event.itemData) {
      row.controls['yarnId'].setValue(null)
      row.controls['yarnCode'].setValue(null)
      row.controls['yarnLotId'].setValue(null)
      row.controls['consigmentYarnId'].setValue("")
      row.controls['quantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      row.controls['yarnCode'].setValue(event.itemData.code)

      this._yarnLotService.selectByIndustryByYarnWb(
        this.reconcilitionRequisitionWBForm.controls['industryId'].value!,
        event.itemData.id
        ).subscribe((response: any) => {
        this.lots = response
      })

      // Get Prices
      this._reportWbService.selectPriceInWb(event.itemData.id, this.reconcilitionRequisitionWBForm.controls['industryId'].value!).subscribe((response: any) => {
        this.yarnsDetails = response
        this.listYarnPrices[index] = [this._sharedComponentService.getAvgPrice(this.yarnsDetails) , this._sharedComponentService.getAvgInputesPrice(this.yarnsDetails), this.yarnsDetails[0].latest_price]
      })
    }
    this.validate(row, index)    
  }

  validate(row: FormGroup, index) {
    if(row.controls['inputOutput'].value == 1) {
      row.controls['fabricToBeManufacturedId'].addValidators([Validators.required])
    } else {
      row.controls['fabricToBeManufacturedId'].removeValidators([Validators.required])
    }
    row.controls['fabricToBeManufacturedId'].updateValueAndValidity()

    if( (parseFloat(row.controls['quantity'].value)  > parseFloat(this.currentQuantity[index])) && !+row.controls['inputOutput'].value) {
      row.controls['quantity'].setErrors({'incorrect': true});
    }
    else {
      row.controls['quantity'].setErrors({'incorrect': null});
      row.controls['quantity'].updateValueAndValidity()
    }
  }

  //  Industry
  selectIndustry(event: { itemData: any; }) {
    if (this.industries.includes(event.itemData)) {
      this._yarnService.selectByIndustryWb(event.itemData.id).subscribe((response: any) => {
        this.yarns = response
      })
    }
    else {
      this.reconcilitionRequisitionWBForm.controls['industryId'].setValue(null)
      this.reconcilitionRequisitionWBForm.controls.items = new FormArray([this.initItem()])
      this.yarns = []
    }
  }

  // Start Yarn Lot Autocomplete Section
  //  Yarn Lot
  selectYarnLot(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.lots.indexOf(event.itemData)
    if (this.lots[indexData] !== event.itemData) {
      row.controls['yarnLotId'].setValue(null)
      this.currentQuantity[index] = 0
    } else {
      this._wbService.selectConsigmentYarnQuantityByYarnByIndustryByLotWb(
        row.controls['yarnId'].value!,
        this.reconcilitionRequisitionWBForm.controls['industryId'].value!, 
        event.itemData.id
        ).subscribe((response: any) => {
          this.consigmentsYarns = response
        })
    }
  }
  // End Yarn Lot Autocomplete Section

  // Start Consigment Yarn Autocomplete Section
  //  Consigment Yarn
  selectConsigmentYarn(event: { itemData: any; }, row: FormGroup, index: number) {
    let indexData = this.consigmentsYarns.indexOf(event.itemData)
    if (this.consigmentsYarns[indexData] !== event.itemData) {
      row.controls['consigmentYarnId'].setValue(null)
      row.controls['validQuantity'].setValue(null)
      this.currentQuantity[index] = 0
    }
    else {
      this.currentQuantity[index] = event.itemData.current_quantity
      row.controls['validQuantity'].setValue(event.itemData.current_quantity)
    }    
  }
  // End Consigment Yarn Autocomplete Section

  //  Fabric
  selectFabric(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.fabrics.indexOf(index.itemData)
    if (this.fabrics[indexData] !== index.itemData) {
      row.controls['fabricToBeManufacturedId'].setValue(null)
      row.controls['fabricCode'].setValue(null)
    }
    else {
      row.controls['fabricCode'].setValue(index.itemData.code)
    }    
  }

  async onReconcilitionRequisitionWB(){
    this.reconcilitionRequisitionWBForm.markAllAsTouched();
    if (this.reconcilitionRequisitionWBForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.reconcilitionRequisitionWBForm, 'items',
      ['yarnCode', 'fabricCode', 'validQuantity'])
    this._constantsService.spinner.show()
      this._reconcilitionRequisitionWbService.add(formGroup.value).subscribe(response => {
      this._constantsService.spinner.hide();
       if (response.msg == "data inserted") {
         this._constantsService.successAddMessage()
         this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[27]}/details`, {id: response.id});
         this._sharedComponentService.reloadPage();
       }
       else{
        if (response.msg == "quantity is wrong") {
          this._constantsService.invalidInventoryQuantityErrorMessage(response.spentQuantity, response.newQuantity)
        }
        else if (response.msg == "duplicated data") {
           this._constantsService.duplicateDataErrorMessage()
         }
         else{
           this._constantsService.userErrorMessage()
         }
       }
      });
    }    
   }
}
