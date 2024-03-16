import { Component, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { YarnService } from "src/app/services/main/yarn.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { YarnOrderRequisitionWaService } from "src/app/services/main/wa/yarn-order-requisition-wa.service";
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { ExportDataService } from "src/app/services/export-data.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yarn-order-requisition-add-wa',
  templateUrl: './yarn-order-requisition-add-wa.component.html',
  styleUrls: ['./yarn-order-requisition-add-wa.component.css']
})
export class YarnOrderRequisitionAddWaComponent implements OnInit {

  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addOrderForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    orderId: new FormControl(""),
    orderName: new FormControl(""),
    sellerId: new FormControl(null, [Validators.required]),
    items: new FormArray([

    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  sellers: any
  yarns: any
  yarnsOrderData: any
  requisitionsOrder: any

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

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textYarn: string = "نوع الخيط"

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
    private _yarnService: YarnService,
    private _bussinessmanService: BussinessmanService,
    private _yarnOrderRequisitionWaService: YarnOrderRequisitionWaService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    public _exportDataService: ExportDataService,
    private route: ActivatedRoute,
    private router: Router,

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

    this._yarnService.selectAll().subscribe((response: any) => {
      this.yarns = response
    })

    this._dyedFabricOrderRequisitionWeService.selectAll('opened').subscribe((response: any) => {
      this.requisitionsOrder = response
    })

    if (String(this.router.url).split("?")[0] == `/dashboard/${this._constantsService.ROUTING_LINKS[163]}`) {
      this.route.queryParams
        .subscribe(params => {
          this.getYarnsOrderData(params['id'])
        })
    } else {
      this.initItem()
    }

  }

  getYarnsOrderData(weDyedFabricOrderRequisition) {

    this._yarnOrderRequisitionWaService.inquireYarnsOfFabricForOrderWa(weDyedFabricOrderRequisition).subscribe((response: any) => {
      this.yarnsOrderData = response
      
      this.addOrderForm.controls['name'].setValue(this.yarnsOrderData[0].weDyedFabricOrderRequisition.order_name)
      this.addOrderForm.controls['orderId'].setValue(weDyedFabricOrderRequisition)
      this.addOrderForm.controls['orderName'].setValue(this.yarnsOrderData[0].weDyedFabricOrderRequisition.order_name)
      this.addOrderForm.controls['sellerId'].setValue(this.yarnsOrderData[0].weDyedFabricOrderRequisition.seller_id)

      const formGroup = <FormGroup>this.addOrderForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
      
      for (let i = 0; i < this.yarnsOrderData.length; i++) {
        const element = this.yarnsOrderData[i];

        this.addItemByData(element)
      }

    })
  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      yarnId: new FormControl("", [Validators.required]),
      yarnName: new FormControl(""),
      yarnCode: new FormControl(""),
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
      yarnId: new FormControl(data.id, [Validators.required]),
      yarnName: new FormControl(data.name, [Validators.required]),
      yarnCode: new FormControl(data.code),
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

  removeItem(index: number) {
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

  // Start Yarn Autocomplete Section
  //  Yarn
  selectYarn(index: { itemData: any; }, row: FormGroup) {
    let indexData = this.yarns.indexOf(index.itemData)
    if (this.yarns[indexData] !== index.itemData) {
      row.controls['yarnId'].setValue("")
      row.controls['yarnName'].setValue("")
      row.controls['yarnCode'].setValue("")
    }
    else {
      row.controls['yarnName'].setValue(index.itemData.name)
      row.controls['yarnCode'].setValue(index.itemData.code)
    }
  }
  // End Yarn Autocomplete Section

  //  Dyeing
  selectRequisitionsOrderName(event: { itemData: any; }) {
    
    if (this.requisitionsOrder.includes(event.itemData)) {
      this.addOrderForm.controls['orderId'].setValue(event.itemData.id)
      this.addOrderForm.controls['orderName'].setValue(event.itemData.name)
      this.addOrderForm.controls['name'].setValue(event.itemData.name)
      this.getYarnsOrderData(event.itemData.id)
    } else {
      this.addOrderForm.controls['orderId'].setValue("")
      this.addOrderForm.controls['orderName'].setValue("")
      this.addOrderForm.controls['name'].setValue("")
      const formGroup = <FormGroup>this.addOrderForm;
      formGroup.removeControl('items');
      formGroup.addControl('items', new FormArray([]));
    }
  }

  async onAddRequisition() {
    this.addOrderForm.markAllAsTouched();
    if (this.addOrderForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addOrderForm, 'items',
        ['yarnCode'])
      this._constantsService.spinner.show()
      this._yarnOrderRequisitionWaService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg == "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[156]}/details`, { id: response.id });
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

