import { Component, Inject, OnInit } from '@angular/core';

// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service
import { WarehouseService } from "src/app/services/main/warehouse.service";
import { FabricService } from "src/app/services/main/fabric.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { AddRequisitionWeService } from "src/app/services/main/we/add-requisition-we.service";
import { ColorService } from "src/app/services/main/color.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ConsigmentDyeingService } from "src/app/services/main/consigment-dyeing.service";
import { GradeItemService } from "src/app/services/main/grade-item.service";
import { DyedFabricOrderRequisitionWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-we.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';
import { indexOf } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-add-add-requisition-we',
  templateUrl: './add-add-requisition-we.component.html',
  styleUrls: ['./add-add-requisition-we.component.css']
})
export class AddAddRequisitionWeComponent implements OnInit {


  ///////////////////////////////// Form Group & Form Control ////////////////////////////////
  addRequisitionForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    supplierId: new FormControl('', [Validators.required]),
    orderId: new FormControl('', [Validators.required]),
    workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  });

  ///////////////////////////////// General ////////////////////////////////////////////////
  fabrics: any = []
  suppliers: any = []
  colors: any = []
  colorCategories: any = []
  warehouses: any = []
  consigmentsDyeing: any = []
  gradeItems: any = []
  dyedFabricOrder: any = []
  requisitionsOrder: any
  mappedRequisitionsOrder: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش"

  public onFilteringFabricName(e: any, index) {
    e.preventDefaultAction = true;
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
  public fieldsSupplier: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textSupplier: string = "المورد"

  public onFilteringSupplier(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.suppliers, query);
  }

  // --------------- Color Category --------------
  // maps the appropriate column to fields property
  public fieldsColorCategory: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColorCategory: string = "فئة اللون"

  public onFilteringColorCategoryName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colorCategories, query);
  }

  // --------------- Color --------------
  // maps the appropriate column to fields property
  public fieldsColor: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColorName(e: any, index) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors, query);
  }

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

  // --------------- Consigment --------------
  // maps the appropriate column to fields property
  public fieldsConsigment: Object = { value: "number", text: "number" };
  // set the placeholder to the AutoComplete input
  public textConsigment: string = "رقم الرسالة"

  public onFilteringConsigment(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('number', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.consigmentsDyeing, query);
  }

  // --------------- Grade Item --------------
  // maps the appropriate column to fields property
  public fieldsGradeItem: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textGradeItem: string = "نوع الدرجة"

  public onFilteringGradeItem(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.gradeItems, query);
  }

  // --------------- Requisition nOrder --------------
  // maps the appropriate column to fields property
  public fieldsDyedFabricOrder: Object = {
    value: "id",
    text: "name"
  };
  // set the placeholder to the AutoComplete input
  public textDyedFabricOrder: string = "اسم الطلبية"

  public onFilteringDyedFabricOrder(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyedFabricOrder, query);
  }

  constructor(
    private _warehouseService: WarehouseService,
    protected _fabricService: FabricService,
    protected _supplierService: BussinessmanService,
    protected _addRequisitionWeService: AddRequisitionWeService,
    private _dyedFabricOrderRequisitionWeService: DyedFabricOrderRequisitionWeService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    protected _constantsService: ConstantsService,
    protected patterns: ValidatorPatternService,
    protected _sessionManagerService: SessionManagerService,
    private _colorService: ColorService,
    protected _colorCategoryService: ColorCategoryService,
    protected _consigmentDyeingService: ConsigmentDyeingService,
    private _gradeItemService: GradeItemService,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._dyedFabricOrderRequisitionWeService.selectAll('opened').subscribe((response: any) => {
      this.dyedFabricOrder = response

      
      this.mappedRequisitionsOrder = this.dyedFabricOrder.map(c => ({
        ordersRequisitionsId: c.orders_requisitions_id,
        orderId: c.id,
        orderName: c.name
      }));
    })

    this._supplierService.selectSupplier().subscribe((response: any) => {
      this.suppliers = response
    })

    this._warehouseService.selectAll().subscribe((response: any) => {
      this.warehouses = response
    })

    this._consigmentDyeingService.selectAll().subscribe((response: any) => {
      this.consigmentsDyeing = response
    })

    this._gradeItemService.selectAll().subscribe((response: any) => {
      this.gradeItems = response
    })

    
      this._fabricService.selectAll("dyed").subscribe((response: any) => {
        this.fabrics = response
      })

      
      this._colorCategoryService.selectAll().subscribe((response: any) => {
        this.colorCategories = response
      })

this._colorService.selectAll().subscribe((response: any) => {
      this.colors = response
    })

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      // ordersRequisitionsId: new FormControl("", [Validators.required]),
      // dyedFabricOrderId: new FormControl("", [Validators.required]),
      warehouseId: new FormControl(this._constantsService.DEFAULT_WE_WAREHOUSE_ID, [Validators.required]),
      dyedFabricId: new FormControl(null, [Validators.required]),
      dyedFabricCode: new FormControl(null),
      colorCategoryId: new FormControl(null, [Validators.required]),
      colorId: new FormControl(null, [Validators.required]),
      colorCode: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      gradeItemId: new FormControl("", [Validators.required]),
      consigmentDyeingNumber: new FormControl("", [Validators.required]),
      numberFabricPieces: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.number)]),
      dyeingCode: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      price: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      priceDollar: new FormControl("0", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      workOrderNumber: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      storagePlace: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.shortText)]),
      document: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.number)]),
      statement: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    });
  }

  addItem() {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.addRequisitionForm.get('items');
    control.removeAt(index);
  }

  // Start Dyed Fabric Order Autocomplete Section
  //  Dyed Fabric Order
  // selectDyedFabricOrder(event: { itemData: any; }, row: FormGroup, index) {
  //   let indexData = this.dyedFabricOrder.indexOf(event.itemData)
  //   if (this.dyedFabricOrder[indexData] !== event.itemData) {
  //     row.controls['dyedFabricId'].setValue(null)
  //     row.controls['dyedFabricCode'].setValue(null)
  //     this.fabrics[index] = []
  //     this.colorCategories[index] = []
  //   }
  //   else {
  //     // console.log("event.itemData ::: ", event.itemData);
  //     // row.controls['dyedFabricCode'].setValue(event.itemData.code)
  //     row.controls['ordersRequisitionsId'].setValue(event.itemData.orders_requisitions_id)


  //     this._fabricService.selectDyedFabricsByOrder(event.itemData.orders_requisitions_id, "dyed").subscribe((response: any) => {
  //       this.fabrics[index] = response
  //     })
  //   }
  // }
  // End Fabric Autocomplete Section

  // Start Fabric Autocomplete Section
  //  Fabric
  selectFabric(event: { itemData: any; }, row: FormGroup, index) {
    let indexData = this.fabrics.indexOf(event.itemData)
    if (this.fabrics[indexData] !== event.itemData) {
      row.controls['dyedFabricId'].setValue(null)
      row.controls['dyedFabricCode'].setValue(null)
      // this.colorCategories[index] = []
      // this.colors[index] = []

    }
    else {
      row.controls['dyedFabricCode'].setValue(event.itemData.code)


      // this._colorCategoryService.selectByOrderByDyedFabricWe(row.controls['ordersRequisitionsId'].value, event.itemData.id).subscribe((response: any) => {
      //   this.colorCategories[index] = response
      // })
    }
  }
  // End Fabric Autocomplete Section

  // Start Supplier Autocomplete Section
  //  Supplier
  selectSupplier(event: { itemData: any; }) {
    if (!this.suppliers.includes(event.itemData)) {
      this.addRequisitionForm.controls['supplierId'].setValue(null)
    }
  }
  // End Supplier Autocomplete Section

  // Color Category
  selectColorCategory(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colorCategories.includes(event.itemData)) {
      row.controls['colorCategoryId'].setValue(null)
      row.controls['colorId'].setValue(null)
      row.controls['colorCode'].setValue(null)
    } else {

      // this._colorService.selectByOrderByDyedFabricByColorCategoryWe(
      //   row.controls['ordersRequisitionsId'].value,
      //   row.controls['dyedFabricId'].value,
      //   event.itemData.id
      // ).subscribe((response: any) => {
      //   this.colors[index] = response
      // })
    }
  }

  // Color
  selectColor(event: { itemData: any; }, row: FormGroup, index) {
    if (!this.colors.includes(event.itemData)) {
      row.controls['colorId'].setValue(null)
    }
  }

  //  Warehouse
  selectWarehouse(event: { itemData: any; }, row: FormGroup) {
    if (!this.warehouses.includes(event.itemData)) {
      row.controls['warehouseId'].setValue("")
    }
  }

  //  Grade item
  selectGradeItem(event: { itemData: any; }, row: FormGroup) {
    if (!this.gradeItems.includes(event.itemData)) {
      row.controls['gradeItemId'].setValue("")
    }
  }

  // price
  changePrice(type, row: FormGroup) {
    if (type == "priceEG") {
      row.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(row.controls['price'].value))
    } else if (type == "priceDollar") {
      row.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(row.controls['priceDollar'].value))
    }
  }

  async onAddRequisition() {
    this.addRequisitionForm.markAllAsTouched();
    if (this.addRequisitionForm.valid) {
      const formGroup = await this._sharedComponentService.deleteControlsOfFormArray(this.addRequisitionForm, 'items',
        ['dyedFabricCode'])
      this._constantsService.spinner.show()
      this._addRequisitionWeService.add(formGroup.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
          this._sharedComponentService.openNewTab(`${this._constantsService.ROUTING_MAIN_LINKS[0]}${this._constantsService.ROUTING_LINKS[77]}/details`, { id: response.id });
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
