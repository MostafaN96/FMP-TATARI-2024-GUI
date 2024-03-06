import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWdService } from "src/app/services/main/wd/report-wd.service";
import { BussinessmanService } from "src/app/services/main/bussinessman.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { BarChartReportBySupplierComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-supplier/bar-chart-report-by-supplier.component";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-bar-chart-report-by-dyer-wd',
  templateUrl: './bar-chart-report-by-dyer-wd.component.html',
  styleUrls: ['./bar-chart-report-by-dyer-wd.component.css']
})
export class BarChartReportByDyerWdComponent implements OnInit {

  // Child Components
  @ViewChild('barChartBySupplierReport')barChartBySupplierReport!:BarChartReportBySupplierComponent;

  ///////////////////////////////// General ////////////////////////////////////////////////
  dyers:any

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Dyeing --------------
  // maps the appropriate column to fields property
  public fieldsDyeing: Object = { value: "id", text: "name" };
  // set the placeholder to the AutoComplete input
  public textDyeing: string = "المصبغة"


  public onFilteringDyeing(e: any) {
    e.preventDefaultAction = true;
    var predicate = new Predicate('name', 'contains', e.text);
    var query = new Query();
    //frame the query based on search string with filter type.
    query = (e.text != "") ? query.where(predicate) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.dyers, query);
  }

  constructor(
    private _reportWdService: ReportWdService,
    private _bussinessmanService: BussinessmanService,
    public _sharedComponentService: SharedComponentService,
  ) {
    this.getData()
   }

  ngOnInit(): void {
  }

  getData() {
    this._bussinessmanService.selectDyerDyeing().subscribe((response: any) => {
      this.dyers = response
    })
  }

  getSelectedItem(data: { itemData: any; }) {
    // Chart
    this._reportWdService.dyeingReportByDyeing(data.itemData.id).subscribe((response: any) => {
      this.barChartBySupplierReport.data = response
      this.barChartBySupplierReport.listen();
    })
  }
}