import { Component, Inject, OnInit } from '@angular/core';


// Form Services
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPatternService } from 'src/app/services/validator-pattern.service';
import { MyErrorStateMatcher } from 'src/app/services/error-state-matcher.service';

// Call Service -
import { FabricService } from "src/app/services/main/fabric.service";

// Shared Service
import { SharedComponentService } from "src/app/services/shared-component.service";
import { ConstantsService } from "src/app/services/constants.service";
import { SessionManagerService } from "src/app/services/main/session-manager.service";
import { Router } from '@angular/router';

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-add-fabric',
  templateUrl: './add-fabric.component.html',
  styleUrls: ['./add-fabric.component.css']
})
export class AddFabricComponent implements OnInit {

  rowFabrics: any
  isDyedFabric = false
  // Form Group
  fabricForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.shortText)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.number)]),
    dyeingCode: new FormControl('', [Validators.maxLength(15), Validators.minLength(3), Validators.pattern(this.patterns.validator_pattern.number)]),
    fabricQuantityM2: new FormControl('', [Validators.pattern(this.patterns.validator_pattern.floatNumber)]),
    personid: new FormControl(this._sessionManagerService.Person_ID, [Validators.required]),
    ipaddress: new FormControl(this._sessionManagerService.IP_ADDRESS, [Validators.required]),
  })

    ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Fabric --------------
  // maps the appropriate column to fields property
  public fieldsFabric: Object = { value: "id", text:"fabric_name_code"};
  // set the placeholder to the AutoComplete input
  public textFabric: string = "اسم القماش الخام"

  public onFilteringFabricName (e: any)
  {
    e.preventDefaultAction=true;
         var predicate = new Predicate('fabric_name_code', 'contains', e.text);
         predicate = predicate.or('code', 'contains', e.text);
          var query = new Query();
      //frame the query based on search string with filter type.
        query = (e.text != "") ? query.where(predicate) : query;
      //pass the filter data source, filter query to updateData method.
        e.updateData(this.rowFabrics, query);
  }


  constructor(
    private _FabricService: FabricService,
    public matcher: MyErrorStateMatcher,
    public _sharedComponentService: SharedComponentService,
    private _constantsService: ConstantsService,
    private patterns: ValidatorPatternService,
    private _sessionManagerService: SessionManagerService,
    private router: Router,

  ) {
    this._sharedComponentService.configRouterReloadPage()
  }

  ngOnInit(): void {
    if(this.router.url === '/dashboard/add-dyed-fabric') {
      this.getRowFabric();
      this.getData("dyed")
      this.fabricForm.addControl("wasteRatio",new FormControl("0"));
      this.fabricForm.addControl("fabricId",new FormControl("", [Validators.required]));
      this.isDyedFabric = true
    }
    else {
      this.fabricForm.addControl("isForm",new FormControl(1));
      this.getData()
    }
  }

  getData(isDyed?:string) {
    this._FabricService.selectMaxCode(isDyed).subscribe((response: any) => {
      this.fabricForm.controls['code'].setValue(String(parseFloat(response[0].code) + 1))
    })
  }

  getRowFabric() {
    this._FabricService.selectAll().subscribe((response: any) => {
      this.rowFabrics = response
    })
  }

  isChecked(control, value) {
    this.fabricForm.controls[control].setValue(value)
  }

     //  Fabric
     selectFabric(index: { itemData: any; }, row: FormGroup) {
      let indexData = this.rowFabrics.indexOf(index.itemData)
      if (this.rowFabrics[indexData] !== index.itemData) {
        row.controls['fabricId'].setValue(null)
      }
      else {
        row.controls['fabricId'].setValue(index.itemData.id)
      }    
    }

  onAddFabric(isDyed?:string) {
    if(this.router.url === '/dashboard/add-dyed-fabric') {
      isDyed = "dyed"
    }
    else {
      isDyed = ""
    }
    if (this.fabricForm.valid) {
      this._constantsService.spinner.show()
      this._FabricService.add(this.fabricForm.value, isDyed).subscribe(response => {
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

}
