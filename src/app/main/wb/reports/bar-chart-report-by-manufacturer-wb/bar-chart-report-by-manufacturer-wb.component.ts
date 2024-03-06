import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWbService } from "src/app/services/main/wb/report-wb.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { BarChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-supplier/bar-chart-report-by-supplier.component";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-bar-chart-report-by-manufacturer-wb',
  templateUrl: './bar-chart-report-by-manufacturer-wb.component.html',
  styleUrls: ['./bar-chart-report-by-manufacturer-wb.component.css']
})
export class BarChartReportByManufacturerWbComponent implements OnInit {

  // Child Components
  @ViewChild('barChartBySupplierReport')barChartBySupplierReport!:BarChartReportBySupplierComponent;

  ///////////////////////////////// General ////////////////////////////////////////////////
  industries:any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

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

  constructor(
    private _reportWbService: ReportWbService,
    private _bussinessmanService: BussinessmanService,
    public _sharedComponentService: SharedComponentService,
  ) {
    this.getData()
   }

  ngOnInit(): void {
  }

  getData() {
    this._bussinessmanService.selectManufacturerManufactured().subscribe((response: any) => {
      this.industries = response
    })
  }

  getSelectedItem(data: { itemData: any; }) {
    // Chart
    this._reportWbService.selectAddedByIndustry(data.itemData.id).subscribe((response: any) => {
      this.barChartBySupplierReport.data = response
      this.barChartBySupplierReport.listen();
    })
  }
}