import { Injectable } from '@angular/core';

import * as moment from 'moment';

// PDF
import * as html2pdf from 'html2pdf.js';
import { NgxSpinnerService } from "ngx-spinner";


import jsPDF from 'jspdf'
// import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'

// Excel
import * as XLSX from "xlsx";

// Reload Page
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  exportToPDF(elementHeaderId: string, elementId: string, fileName: string, element2Id?: string, element3Id?: string) {
    /** spinner starts on init */
    this.spinner.show();
    let pdfName = moment().format('YYYY-MM-DD')

    var elementTitle = document.getElementById("main-page-title")
    var elementHeader = document.getElementById(elementHeaderId);
    var element = document.getElementById(elementId)
    var element2 = document.getElementById(element2Id || '')
    var element3 = document.getElementById(element3Id || '')

    if (element2 != undefined) {
      element2.style.display = "inline"
    }

    if (element3 != undefined) {
      element3.style.display = "inline"
    }

    elementTitle!.innerHTML = `<div> <h1 class="text-center">${fileName}</h1> </div>`
    elementTitle!.append(elementHeader || "")
    // element!.style.position = "relative";
    element!.style.cssText += 'width: 100%';
    if (element?.childNodes[2] != undefined) {
      element!.childNodes[2]['className'] = "tfoot-pdf-style"
    }

    elementTitle!.append(element!)
    // element2!.style.position = "relative";
    // element2!.childNodes[2]['className'] = "tfoot-pdf-style"
    elementTitle!.append(element2 || "")

    var opt = {
      margin: 2,
      filename: fileName + pdfName + '.pdf',
      image: { type: 'jpeg', quality: 0.40 },
      html2canvas: { scale: 4, logging: true, dpi: 192, letterRendering: true, useCORS: true },
      jsPDF: {
        unit: 'mm', format: 'a4', orientation: 'landscape', putOnlyUsedFonts: true,
        floatPrecision: "smart", compress: true, style: 'F'
      },
      pagebreak: { avoid: ['table tr', 'table tr'] }
    };

    html2pdf().from(elementTitle).set(opt).toPdf().get('pdf').then(function (pdf) {
      // window.open(pdf.output('bloburl'), '_blank');
      // window.location.reload()
      // window.open(pdf.output('save'), '_blank');

      // ex 1
      window.open(pdf.output('save', fileName + "-" + pdfName + '.pdf'), '_blank');
      window.location.reload()

      // ex 2
      // var string = pdf.output('datauristring');
      // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
      // let x = window.open();
      // x?.document.open();
      // x?.document.write(embed);
      // x?.document.close();

      // pdf.save(fileName + "-" + pdfName + '.pdf')
      // window.location.reload()

    });
    // html2pdf(elementTitle, opt);
  }

  exportToExcel(elementHeaderId: string, elementId: string, fileName: string, element2Id?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = fileName || "ExportResult";
    let exportFileName = `${prefix}`;

    var elementTitle = document.getElementById("main-page-title")
    var elementHeader = document.getElementById(elementHeaderId);
    var element = document.getElementById(elementId);
    var element2 = document.getElementById(element2Id || '')

    if (element2 != undefined) {
      element2.style.display = "inline"
    }

    elementTitle!.innerHTML = `<div> <h1 class="text-center">${fileName}</h1> </div>`
    elementTitle!.append(elementHeader || "")
    elementTitle!.append(element!)
    elementTitle!.append(element2 || "")

    let wb = XLSX.utils.table_to_book(elementTitle, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${exportFileName}.xlsx`)
    window.location.reload()
  }

  createPdf(tableId: string) {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('My PDF Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.addFileToVFS('IBMPlexSansArabic-Regular-normal.ttf', "font")
    doc.addFont('IBMPlexSansArabic-Regular-normal.ttf', 'IBMPlexSansArabic', 'normal');
    doc.setFont('IBMPlexSansArabic', "normal");
    doc.text("مرحبا", 100, 100)

    // doc.setFont("Amiri", "normal")
    // doc.addFont('Amiri-normal-normal.ttf', 'Amiri-normal', 'normal');
    autoTable(doc,
      { html: `#${tableId}` })

    // (doc as any).autoTable({
    //   head: head,
    //   body: data,
    //   theme: 'plain',
    //   didDrawCell: (data: { column: { index: any; }; }) => {
    //     console.log(data.column.index)
    //   }
    // })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    // doc.save('table.pdf');
  }

  print(elementHeaderId: string, elementId: string, fileName: string, element2Id?: any, element3Id?: any) {
    
    let elementTitle = document.getElementById("main-page-title")
    var elementHeader = document.getElementById(elementHeaderId) || document.createElement("null");
    const printContent =`<table>`+ document.getElementById(elementId)?.innerHTML + `</table>`
    var element2 = document.getElementById(element2Id ?? undefined) 
    var element3 = document.getElementById(element3Id ?? undefined)

    var yourDOCTYPE = `
    <html>
    <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }

    table thead th, table tbody tr th, table tfoot tr td {
      border: 1px solid #000;
      background-color: #ccc;
    }

    table tbody td  {
      border: 1px solid #000 !important;
      text-align: center;
    }

    table tfoot tr td {
      text-align: center;
    }

    table tbody td  {
      max-width: 200px;
    }

    .table-style tbody td table {
      width: 100%;
    }

    .table-style[mat-table] {
      width: 100%;
    }

    table.p-datatable-table thead tr th,
    table.p-datatable-table tbody tr td,
    table.p-datatable-table tfoot tr td{
      max-width: 100% !important;
    }

    table th[data-html2canvas-ignore="true"], table td[data-html2canvas-ignore="true"]   {
      display: none;
    }
    

    body {
      direction: rtl;
      margin: 1px;
      padding: 1px;
    }

    body table{
      margin-top: 4px;
      padding: 1px;
    }

    h2 {
      text-align: center;
    }

    </style>
    <body>
    
    
    ` ; // your doctype declaration
    let printPreview = window.open('about:blank', 'print_preview');
let printDocument = printPreview!.document;




printDocument.open();    

    // printDocument!.append(elementHeader || "")
    // printDocument!.append(printContent || "")
    printDocument.write(yourDOCTYPE+
      elementTitle!.innerHTML+
      elementHeader?.innerHTML+
      printContent+
      `
    </body>
    </html>
    `);

    if (element2 != undefined) {
      element2['style'].display = "inline"
      printDocument.write( "<table>"+
        element2.innerHTML +
        "</table>"
        );
      // printDocument.body!.append(otherElement)
    }

    if (element3 != undefined) {
      element3['style'].display = "inline"
      printDocument.write( "<table>"+
        element3.innerHTML
         +
        "</table>");
      // printDocument.body!.append(otherElement)
    }
    
    printDocument.write(
      `
            </body>
            </html>
            `);

    printPreview?.focus();
    printPreview?.print();
    printPreview?.close();
  }

  printMultiple(elementHeaderId: string, elementArray: any, fileName: string, element2Id?: string) {

    for (let i = 0; i < elementArray.length; i++) {
      const elementId = elementArray[i];

      var elementTitle = document.getElementById("main-page-title")
      var elementHeader = document.getElementById(elementHeaderId);
      const printContent = document.getElementById(elementId);
      var element2 = document.getElementById(element2Id || '')

      elementTitle!.append(elementHeader || "")
      elementTitle!.append(printContent || "")
      elementTitle!.append(element2 || "")

      if (elementArray.length - 1 == i) {
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt?.document.write(`
      <html>
      <style>
      table {
        border-collapse: collapse;
      }
  
      table thead th, table tbody tr th, table tfoot tr td {
        border: 1px solid #000;
        background-color: #ccc;
      }
  
      table tbody td  {
        border: 1px solid #ccc !important;
        text-align: center;
      }
  
      table tfoot tr td {
        text-align: center;
      }
  
      table tbody td  {
        max-width: 200px;
      }
  
      .table-style tbody td table {
        width: 100%;
      }
  
      .table-style[mat-table] {
        width: 100%;
      }
  
      table th[data-html2canvas-ignore="true"], table td[data-html2canvas-ignore="true"]   {
        display: none;
      }
      
  
      body {
        direction: rtl;
        margin: 1px;
        padding: 1px;
      }
  
      body table{
        margin-top: 4px;
        padding: 1px;
      }
  
      h2 {
        text-align: center;
      }
  
      </style>
      <body>
      <table> 
      ${elementTitle!.innerHTML}
      </table>
      </body>
      </html>
      ` );
        window.location.reload()
        WindowPrt?.document.close();
        WindowPrt?.focus();
        WindowPrt?.print();
        WindowPrt?.close();
      }
    }


  }

  exportToPDFMultiple(elementHeaderId: string, elementArray: any, fileName: string, element2Id?: string) {
    /** spinner starts on init */
    this.spinner.show();
    let pdfName = new Date().getUTCFullYear().toString() + "-" + new Date().getMonth().toString() + "-" + new Date().getDay().toString()

    var elementTitle = document.getElementById("main-page-title")

    for (let i = 0; i < elementArray.length; i++) {
      const elementId = elementArray[i];

      // var elementHeader = document.getElementById(elementHeaderId);
      var element = document.getElementById(elementId)
      // var element2 = document.getElementById(element2Id || '')

      // elementTitle!.appendChild(elementHeader!)
      // element!.style.position = "relative";
      // element!.childNodes[2]['className'] = "tfoot-pdf-style"

      // element2!.style.position = "relative";
      // element2!.childNodes[2]['className'] = "tfoot-pdf-style"
      // elementTitle!.append(element2 || "")

      if(element != undefined) {
        element!.style.width = "100%"; 
        elementTitle!.appendChild(element!)        
      }

      if (elementArray.length - 1 == i) {
        var opt = {
          margin: 2,
          filename: fileName + pdfName + '.pdf',
          image: { type: 'jpeg', quality: 0.40 },
      html2canvas: { 
        scale: 4, logging: true, 
        dpi: 96, 
        letterRendering: true, 
        // height: window.outerHeight + window.innerHeight,
            // windowHeight: window.outerHeight + window.innerHeight, 
        useCORS: true },
      jsPDF: {
        unit: 'mm', format: 'a4', orientation: 'landscape', putOnlyUsedFonts: true,
        floatPrecision: "smart", compress: true, style: 'F'
      },
      pagebreak: { avoid: ['table tr', 'table tr'] }
        };

          // html2pdf().from(elementTitle).set(opt).toPdf().get('pdf').then(function (pdf) {
          //   // window.open(pdf.output('bloburl'), '_blank');
          //   // window.location.reload()

          //   window.open(pdf.output('save', fileName + "-" + pdfName + '.pdf'), '_blank');
          //   window.location.reload()
          // });

          html2pdf().from(elementTitle).set(opt).save();

      }
    }
  }

  exportToExcelMultiple(elementHeaderId: string, elementArray: any, fileName: string) {
    let timeSpan = moment().format('YYYY-MM-DD');
    let prefix = fileName || "ExportResult";
    let exportFileName = `${prefix}`;

    for (let i = 0; i < elementArray.length; i++) {
      const elementId = elementArray[i];

      var elementTitle = document.getElementById("main-page-title")
      var elementHeader = document.getElementById(elementHeaderId);
      var element = document.getElementById(elementId);

      // elementTitle!.innerHTML = `<div> <h1 class="text-center">${fileName}</h1> </div>`
      elementTitle!.append(elementHeader || "")
      elementTitle!.append(element!)

      if (elementArray.length - 1 == i) {
        let wb = XLSX.utils.table_to_book(elementTitle, <XLSX.Table2SheetOpts>{ sheet: prefix });
        XLSX.writeFile(wb, `${exportFileName+'-'+timeSpan}.xlsx`)
        window.location.reload()
      }
    }


}
}



// print(elementHeaderId: string, elementId: string, fileName: string, element2Id?: string, element3Id?: string) {
//   var elementTitle = document.getElementById("main-page-title")
//   var elementHeader = document.getElementById(elementHeaderId);
//   const printContent = document.getElementById(elementId);
//   var element2 = document.getElementById(element2Id || '')
//   var element3 = document.getElementById(element3Id || '')

//   elementTitle!.append(elementHeader || "")
//   elementTitle!.append(printContent || "")
  
//   if (element2 != undefined) {
//     element2.style.display = "inline"
//     elementTitle!.append(element2 || "")
//   }

//   if (element3 != undefined) {
//     element3.style.display = "inline"
//     elementTitle!.append(element3 || "")
//   }

//   const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
//   WindowPrt?.document.write(`
//   <html>
//   <style>
//   table {
//     border-collapse: collapse;
//     width: 100%;
//   }

//   table thead th, table tbody tr th, table tfoot tr td {
//     border: 1px solid #000;
//     background-color: #ccc;
//   }

//   table tbody td  {
//     border: 1px solid #000 !important;
//     text-align: center;
//   }

//   table tfoot tr td {
//     text-align: center;
//   }

//   table tbody td  {
//     max-width: 200px;
//   }

//   .table-style tbody td table {
//     width: 100%;
//   }

//   .table-style[mat-table] {
//     width: 100%;
//   }

//   table.p-datatable-table thead tr th,
//   table.p-datatable-table tbody tr td,
//   table.p-datatable-table tfoot tr td{
//     max-width: 100% !important;
//   }

//   table th[data-html2canvas-ignore="true"], table td[data-html2canvas-ignore="true"]   {
//     display: none;
//   }
  

//   body {
//     direction: rtl;
//     margin: 1px;
//     padding: 1px;
//   }

//   body table{
//     margin-top: 4px;
//     padding: 1px;
//   }

//   h2 {
//     text-align: center;
//   }

//   </style>
//   <body>
//   <table> 
//   ${elementTitle!.innerHTML}
//   </table>
//   </body>
//   </html>
//   ` );
//   window.location.reload()
//   WindowPrt?.document.close();
//   WindowPrt?.focus();
//   WindowPrt?.print();
//   WindowPrt?.close();
// }