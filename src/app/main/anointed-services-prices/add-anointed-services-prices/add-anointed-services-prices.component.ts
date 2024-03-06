import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { DyeingServicesPricesService } from "src/app/services/main/dyeing-services-prices.service";
import { DyeingServicesService } from "src/app/services/main/dyeing-services.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";

@Component({
  selector: 'app-add-anointed-services-prices',
  templateUrl: './add-anointed-services-prices.component.html',
  styleUrls: ['./add-anointed-services-prices.component.css']
})
export class AddAnointedServicesPricesComponent implements OnInit {

  resultAnointedServices: any;
  dyers: any;

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Dyer --------------
  // maps the appropriate column to fields property
  public fieldsDyer: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyer: string = "المصبغة"

  public onFilteringDyer(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
  }

  // Form Group
  anointedServicesPricesForm: FormGroup = new FormGroup({
    dyerId: new FormControl('', [Validators.required]),
    items: new FormArray([
      this.initItem(),
    ]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

  constructor(
    private _dyeingServicesPricesService: DyeingServicesPricesService,
    private _bussinessmanService: BussinessmanService,
    private _dyeingServicesService: DyeingServicesService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    this._bussinessmanService.selectDyer().subscribe((response: any) => {
      this.dyers = response;
    });

    this._dyeingServicesService.selectAll().subscribe((response: any) => {
      this.resultAnointedServices = response;
    });

  }

  // Initialize Form Builder
  initItem() {
    return new FormGroup({
      anointedServicesId: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
      isFabricPiece: new FormControl('0', [Validators.pattern(this.patterns.validator_pattern.number)]),
    });
  }

  addItem() {
    const control = <FormArray>this.anointedServicesPricesForm.get('items');
    control.push(this.initItem());
  }

  getItem(form: any) {
    return form.controls.items.controls;
  }

  removeItem(index: number) {
    const control = <FormArray>this.anointedServicesPricesForm.get('items');
    control.removeAt(index);
  }

  // Start Dyer Autocomplete Section
  //  Dyer
  selectDyer(event: { itemData: any; }) {
    if (!this.dyers.includes(event.itemData)) {
      this.anointedServicesPricesForm.controls['dyerId'].setValue(null)
    }
  }
  // End Dyer Autocomplete Section

  onAddAnointedServicesPrices() {
    
    if (this.anointedServicesPricesForm.valid) {
      this._constantsService.spinner.show()
      this._dyeingServicesPricesService.add(this.anointedServicesPricesForm.value).subscribe(response => {
        this._constantsService.spinner.hide();
        if (response.msg === "data inserted") {
          this._constantsService.successAddMessage()
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

  selectIsFabricPiece(event: any, row: FormGroup) {
    if (event.checked) {
      row.controls['isFabricPiece'].setValue('1');
    }
    else {
      row.controls['isFabricPiece'].setValue('0');
    }
  }
}
