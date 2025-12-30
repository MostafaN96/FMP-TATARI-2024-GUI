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
import { BussinessmanService } from 'src/app/services/main/bussinessman.service';
import { DyedFabricOrderRequisitionDetailsWeService } from "src/app/services/main/we/dyed-fabric-order-requisition-details-we.service";
import { ColorCategoryService } from "src/app/services/main/color-category.service";
import { ColorService } from "src/app/services/main/color.service";
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
  dyers: any = []
  dyedFabrics: any = []
  colorCategories: any
  colors: any

  @Input() selectedData: any
  manufacturingOrderWdForm: FormGroup = new FormGroup({
    date: new FormControl("", [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern(this.patterns.validator_pattern.shortText)]),
    note: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    quantity: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    wasteRatio: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    dyedFabricId: new FormControl("", [Validators.required]),
    sellerName: new FormControl("", [Validators.required]),
    sellerId: new FormControl("", [Validators.required]),
    dyedFabricName: new FormControl("", [Validators.required]),
    fabricWidth: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    fabricQuantityM2: new FormControl("", [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    price: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    priceDollar: new FormControl("", [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    note2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.longText)]),
    colorId: new FormControl("", [Validators.required]),
    colorName: new FormControl(""),
    colorCode: new FormControl("", [Validators.required]),
    colorCategoryId: new FormControl("", [Validators.required]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;
  
  // --------------- Dyeing --------------
  // maps the appropriate column to fields property
  public fieldsDyeing: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyeing: string = "العميل"


  public onFilteringDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
  }

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

  // --------------- Color Category --------------
  // maps the appropriate column to fields property
  public fieldsColorCategory: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textColorCategory: string = "فئة اللون"

  public onFilteringColorCategoryName(e: any) {
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
  public fieldsColor: Object = { value: "id", text: "color_name_code" };
  // set the placeholder to the AutoComplete input
  public textColor: string = "اللون"

  public onFilteringColorName(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('color_name_code', 'contains', e.text);
    predicate = predicate.or('code', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.colors, query);
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
    private _bussinessmanService: BussinessmanService,
    private _colorCategoryService: ColorCategoryService,
    private _colorService: ColorService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.requisitionId = params['id']
      })

      
    this._fabricService.selectAll("dyed").subscribe((response: any) => {
      this.dyedFabrics = response
    })

    this._bussinessmanService.selectAll().subscribe((response: any) => {
      this.dyers = response
    })
  }

  ngOnChanges() {
    this._colorCategoryService.selectAll().subscribe((response: any) => {
      this.colorCategories = response
    })
    this._colorService.selectByCategory(this.selectedData?.color_category_id).subscribe((response: any) => {
      this.colors = response
    })    

    this.manufacturingOrderWdForm.controls['date'].setValue(this.selectedData?.date)
    this.manufacturingOrderWdForm.controls['name'].setValue(this.selectedData?.order_name)
    this.manufacturingOrderWdForm.controls['note'].setValue(this.selectedData?.note)
    this.manufacturingOrderWdForm.controls['quantity'].setValue(String(this.selectedData?.quantity) ?? '')
    this.manufacturingOrderWdForm.controls['wasteRatio'].setValue(this.selectedData?.waste_ratio)
    this.manufacturingOrderWdForm.controls['sellerName'].setValue(this.selectedData?.seller_name)
    this.manufacturingOrderWdForm.controls['sellerId'].setValue(this.selectedData?.seller_id)
    this.manufacturingOrderWdForm.controls['dyedFabricName'].setValue(this.selectedData?.dyed_fabric_name)
    this.manufacturingOrderWdForm.controls['dyedFabricId'].setValue(this.selectedData?.dyed_fabric_id)
    this.manufacturingOrderWdForm.controls['colorCode'].setValue(this.selectedData?.color_code)
    this.manufacturingOrderWdForm.controls['colorId'].setValue(this.selectedData?.color_id)
    this.manufacturingOrderWdForm.controls['colorName'].setValue(this.selectedData?.color_name_code)
    this.manufacturingOrderWdForm.controls['colorCategoryId'].setValue(this.selectedData?.color_category_id)
    this.manufacturingOrderWdForm.controls['fabricWidth'].setValue(this.selectedData?.fabric_width)
    this.manufacturingOrderWdForm.controls['fabricQuantityM2'].setValue(this.selectedData?.fabric_quantity_m2)
    this.manufacturingOrderWdForm.controls['price'].setValue(this.selectedData?.price)
    this.manufacturingOrderWdForm.controls['priceDollar'].setValue(this.selectedData?.price_dollar)
    this.manufacturingOrderWdForm.controls['note2'].setValue(this.selectedData?.details_note)
        
    if(this.selectedData.current_quantity != this.selectedData.quantity || 
      this.selectedData.yarnOrders?.length > 0 ||
      this.selectedData.fabricOrders?.length > 0
    ) {
      this.manufacturingOrderWdForm.controls['colorCategoryId'].disable()
      this.manufacturingOrderWdForm.controls['colorName'].disable()
      this.manufacturingOrderWdForm.controls['colorCode'].disable()
      this.manufacturingOrderWdForm.controls['dyedFabricId'].disable()

    } else {
      this.manufacturingOrderWdForm.controls['colorCategoryId'].enable()
      this.manufacturingOrderWdForm.controls['colorName'].enable()
      this.manufacturingOrderWdForm.controls['colorCode'].enable()
      this.manufacturingOrderWdForm.controls['dyedFabricId'].enable()
    }

    if(this.selectedData.current_quantity != this.selectedData.quantity 
    ) {
      this.manufacturingOrderWdForm.controls['sellerId'].disable()
    } else {
      this.manufacturingOrderWdForm.controls['sellerId'].enable()
    }

    // if(this.selectedData.yarnOrders?.length > 0 &&
    //   this.selectedData.fabricOrders?.length > 0
    // ) {
    //   this.manufacturingOrderWdForm.controls['sellerId'].enable()
    // } else {
    //   this.manufacturingOrderWdForm.controls['sellerId'].disable()
    // }
  }

  
  // price
  changePrice(type) {
    if(type == "priceEG") {
      this.manufacturingOrderWdForm.controls['priceDollar'].setValue(this._sharedComponentService.calcEgpToDollar(this.manufacturingOrderWdForm.controls['price'].value))
    } else if (type == "priceDollar") {
      this.manufacturingOrderWdForm.controls['price'].setValue(this._sharedComponentService.calcDollarToEgp(this.manufacturingOrderWdForm.controls['priceDollar'].value))
    }
  }

  
  //  Dyeing
  selectDyeing(event: { itemData: any; }) {
    if (this.dyers.includes(event.itemData)) {
      this.manufacturingOrderWdForm.controls['sellerId'].setValue(event.itemData.id)
    }
    else {
      this.manufacturingOrderWdForm.controls['sellerId'].setValue(null)
    }
  }
  
  // Dyed Fabric
  selectDyedFabric(element: { itemData: any; }) {
    let indexData = this.dyedFabrics.indexOf(element.itemData)
    if (this.dyedFabrics[indexData] !== element.itemData) {
      this.manufacturingOrderWdForm.controls['dyedFabricId'].setValue(null)
    }
    else {
      this.manufacturingOrderWdForm.controls['dyedFabricId'].setValue(element.itemData.id)
    }    
  }

  
  // Color Category
  selectColorCategory(event: { itemData: any; }) {
    if (!this.colorCategories.includes(event.itemData)) {
      this.manufacturingOrderWdForm.controls['colorCategoryId'].setValue(null)
      this.manufacturingOrderWdForm.controls['colorId'].setValue(null)
      this.manufacturingOrderWdForm.controls['colorCode'].setValue(null)
    } else {
      this._colorService.selectByCategory(event.itemData.id).subscribe((response: any) => {
        this.colors = response
      })
    }
  }

  // Color
  selectColor(event: { itemData: any; }) {
    if (!this.colors.includes(event.itemData)) {
      this.manufacturingOrderWdForm.controls['colorId'].setValue(null)
      this.manufacturingOrderWdForm.controls['colorCode'].setValue(null)
    } else {
      this.manufacturingOrderWdForm.controls['colorId'].setValue(event.itemData.id)
      this.manufacturingOrderWdForm.controls['colorCode'].setValue(event.itemData.code)
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



