import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { BarChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-supplier/bar-chart-report-by-supplier.component";

// Auto Complete
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-bar-chart-report-by-supplier-wa',
  templateUrl: './bar-chart-report-by-supplier-wa.component.html',
  styleUrls: ['./bar-chart-report-by-supplier-wa.component.css']
})
export class BarChartReportBySupplierWaComponent implements OnInit {

  // Child Components
  @ViewChild('barChartBySupplierReport') barChartBySupplierReport!: BarChartReportBySupplierComponent;

  ///////////////////////////////// General ////////////////////////////////////////////////
  suppliers: any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

  constructor(
    private _reportWaService: ReportWaService,
    private _bussinessmanService: BussinessmanService,
    public _sharedComponentService: SharedComponentService,
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._bussinessmanService.selectSupplierBuyingYarn().subscribe((response: any) => {
      this.suppliers = response
    })
  }

  getSelectedItem(data: { itemData: any; }) {
    let indexData = this.suppliers.indexOf(data.itemData)
    if (this.suppliers[indexData] !== data.itemData) {
      this.barChartBySupplierReport.data = []
      this.barChartBySupplierReport.listen();
    } else {
      // Chart
      this._reportWaService.purchasesBySupplier(data.itemData.id).subscribe((response: any) => {
        this.barChartBySupplierReport.data = response
        this.barChartBySupplierReport.listen();
      })
    }
  }
}