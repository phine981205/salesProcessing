import { Component } from '@angular/core';
import { Sales, Receipt } from './sales.model';
import { SalesProcessingService } from './sales-processing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateMonth: Date | undefined;
  salesRecord: Sales[] = [{
    invoiceNo: "INV202309-0001",
    status: "Posted",
    period: 202309,
    salesmanId: "USER-01",
    salesValue: 22000,
    gst: 1760,
    invoiceAmt: 23760,
    costValue: 5000
  }, {
    invoiceNo: "INV202309-0002",
    status: "Posted",
    period: 202309,
    salesmanId: "USER-02",
    salesValue: 28000,
    gst: 2240,
    invoiceAmt: 30240,
    costValue: 8000
  }, {
    invoiceNo: "INV202310-0001",
    status: "Posted",
    period: 202310,
    salesmanId: "USER-01",
    salesValue: 3040,
    gst: 243.2,
    invoiceAmt: 3283.2,
    costValue: 1160
  }, {
    invoiceNo: "INV202310-0002",
    status: "Posted",
    period: 202310,
    salesmanId: "USER-01",
    salesValue: 5000,
    gst: 400,
    invoiceAmt: 5400,
    costValue: 0
  }, {
    invoiceNo: "INV202310-0003",
    status: "Posted",
    period: 202310,
    salesmanId: "USER-01",
    salesValue: 30000,
    gst: 2400,
    invoiceAmt: 32400,
    costValue: 3000
  }, {
    invoiceNo: "INV202310-0004",
    status: "Posted",
    period: 202310,
    salesmanId: "USER-02",
    salesValue: 3500,
    gst: 280,
    invoiceAmt: 3780,
    costValue: 200
  }, {
    invoiceNo: "INV202311-0001",
    status: "Posted",
    period: 202311,
    salesmanId: "USER-01",
    salesValue: 4000,
    gst: 320,
    invoiceAmt: 4320,
    costValue: 1000
  }, {
    invoiceNo: "INV202311-0002",
    status: "Posted",
    period: 202311,
    salesmanId: "USER-01",
    salesValue: 12000,
    gst: 960,
    invoiceAmt: 12960,
    costValue: 2500
  }, {
    invoiceNo: "INV202311-0003",
    status: "Posted",
    period: 202311,
    salesmanId: "USER-02",
    salesValue: 25000,
    gst: 2000,
    invoiceAmt: 27000,
    costValue: 0
  }, {
    invoiceNo: "INV202311-0004",
    status: "Posted",
    period: 202311,
    salesmanId: "USER-02",
    salesValue: 2200,
    gst: 176,
    invoiceAmt: 2376,
    costValue: 0
  }, {
    invoiceNo: "INV202312-0001",
    status: "Posted",
    period: 202312,
    salesmanId: "USER-01",
    salesValue: 1000,
    gst: 80,
    invoiceAmt: 1080,
    costValue: 0
  }, {
    invoiceNo: "INV202312-0002",
    status: "Posted",
    period: 202312,
    salesmanId: "USER-01",
    salesValue: 7000,
    gst: 560,
    invoiceAmt: 7560,
    costValue: 500
  }];
  receiptRecord: Receipt[] = [{
    transactionId: "T001",
    status: "Posted",
    receiptNo: "REV202309-0001",
    period: 202309,
    invoiceNo: "INV202309-0001",
    price: 23760
  }, {
    transactionId: "T002",
    status: "Posted",
    receiptNo: "REV202309-0002",
    period: 202309,
    invoiceNo: "INV202309-0002",
    price: 15120
  }, {
    transactionId: "T003",
    status: "Posted",
    receiptNo: "REV202310-0001",
    period: 202310,
    invoiceNo: "INV202310-0001",
    price: 2000
  }, {
    transactionId: "T004",
    status: "Posted",
    receiptNo: "REV202310-0001",
    period: 202310,
    invoiceNo: "INV202310-0003",
    price: 32400
  }, {
    transactionId: "T005",
    status: "Posted",
    receiptNo: "REV202310-0002",
    period: 202310,
    invoiceNo: "INV202310-0004",
    price: 3780
  },{
    transactionId: "T006",
    status: "Open",
    receiptNo: "REV202311-0001",
    period: 202311,
    invoiceNo: "INV202311-0001",
    price: 4320
  }, {
    transactionId: "T007",
    status: "Posted",
    receiptNo: "REV202311-0002",
    period: 202311,
    invoiceNo: "INV202311-0002",
    price: 5000
  }];
  processedData: any;
  currentMonth: number = 0;
  currentYear: number = 0;
  yr2: number = 0;
  mth2: number = 0;
  yr3: number = 0;
  mth3: number = 0;
  generateData: boolean = false;
  base64String: any;

  formatter = new Intl.NumberFormat('en-MY', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
 });

 constructor(
  private apiService: SalesProcessingService
  ) { }
 
  ngOnInit(){
    this.dateMonth = new Date();
    this.currentMonth = this.dateMonth.getMonth()+1;
    this.currentYear = this.dateMonth.getFullYear();
  }


  processData() {
    let arr = [];
    let arr1 = [];

    for (let i = 0; i < this.salesRecord.length; i++) {
      var salesYear = this.salesRecord[i]?.period?.toString().substring(0,4) ?? ""; //recordYear
      var salesMonth = this.salesRecord[i]?.period?.toString().substring(4) ?? ""; //recordMonth
      var yr1 = this.currentYear;
      var mth1 = this.currentMonth;

      if (this.currentMonth + 1 > 12){
        this.mth2 = (this.currentMonth + 1) - 12;
        this.yr2 = this.currentYear + 1;
      } else {
        this.mth2 = this.currentMonth + 1;
        this.yr2 = this.currentYear;
      }
      if (this.currentMonth + 2 > 12){
        this.mth3 = (this.currentMonth + 2) - 12;
        this.yr3 = this.currentYear + 1;
      } else {
        this.mth3 = this.currentMonth + 2;
        this.yr3 = this.currentYear;
      }
      
      if (this.salesRecord[i].status == "Posted"){
        if ((parseInt(salesYear) == yr1 && parseInt(salesMonth) == mth1) || (parseInt(salesYear) == this.yr2 && parseInt(salesMonth) == this.mth2) || (parseInt(salesYear) == this.yr3 && parseInt(salesMonth) == this.mth3)){
          arr.push(this.salesRecord[i])
        }
      }
    }
    for (let i = 0; i < this.receiptRecord.length; i++) {
      if (this.receiptRecord[i].status == "Posted"){
          arr1.push(this.receiptRecord[i])
      }
    }
    this.apiService.processData(arr, arr1)
      .subscribe(data => {
        this.processedData = data;
        console.log(data)
        this.generateData = true;
      });
  }

  changeMonth(event: Date){
    this.currentMonth = event.getMonth()+1;
    this.currentYear = event.getFullYear();
  }
}
