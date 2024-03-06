import { Component, OnInit, ViewChild } from '@angular/core';

// Call Service
import { ReportWaService } from "src/app/services/main/wa/report-wa.service";
import { YarnService } from "src/app/services/main/yarn.service";
import { SharedComponentService } from "src/app/services/shared-component.service";

// Child Components
import { BarChartReportByItemComponent } from "src/app/main/reports/charts-reports/bar-chart-report-by-item/bar-chart-report-by-item.component";

// Auto Complete
import { Query,Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-bar-chart-report-by-item-wa',
  templateUrl: './bar-chart-report-by-item-wa.component.html',
  styleUrls: ['./bar-chart-report-by-item-wa.component.css']
})
export class BarChartReportByItemWaComponent implements OnInit {

// Child Components
  @ViewChild('barChartByItemReport')barChartByItemReport!:BarChartReportByItemComponent;

  ///////////////////////////////// General ////////////////////////////////////////////////
  yarns:any = []

  ///////////////////////////////// Auto Complete Data  ////////////////////////////////
  // Auto Complete Data 
  //enable the highlight property to highlight the matched character in suggestion list
  public autofill: Boolean = true;

  // --------------- Yarn --------------
  // maps the appropriate column to fields property
  public fieldsYarn: Object = { value: "id", text:"name"};
  // set the placeholder to the AutoComplete input
  public textYarn: string = "اسم الصنف"

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

  constructor(
    private _reportWaService: ReportWaService,
    private _yarnService: YarnService,
    public _sharedComponentService: SharedComponentService,
  ) {
   }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._yarnService.selectStoredWaYarns().subscribe((response: any) => {
      this.yarns = response
    })
  }

  getSelectedItem(data: { itemData: any; }) {
    let indexData = this.yarns.indexOf(data.itemData)
    if (this.yarns[indexData] !== data.itemData) {
      this.barChartByItemReport.data = []
      this.barChartByItemReport.listen();
    } else {
      // Chart
      this._reportWaService.purchasesByYarn(data.itemData.id).subscribe((response: any) => {
        this.barChartByItemReport.data = response
        this.barChartByItemReport.listen();
      })
    }
  }
}