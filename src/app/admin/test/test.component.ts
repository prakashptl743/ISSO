import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../service/dashboard.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { SelectItem } from "primeng/api";
declare var google: any;
@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"],
})
export class TestComponent implements OnInit {
  studentCount: number;
  yearOptions: SelectItem[];
  schoolCount: number;
  gameCount: number;
  eventCount: number;
  title = "Dashboard";
  selectedYear: any;
  columnChartselectedYear: any;
  yearvalue: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private issoUtilService: IssoUtilService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    // var  m =  new Date().getMonth();
    // var y =  new Date().getFullYear();
    if (month >= 5) {
      this.yearvalue = year + "-" + (year + 1);
    } else {
      this.yearvalue = year - 1 + "-" + year;
    }
    //this.selectedMonth = m + '-' + y
    this.selectedYear = this.yearvalue;
    this.columnChartselectedYear = this.yearvalue;
    this.yearOptions = this.issoUtilService.setYear();
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => {
      this.getPaymentData();
      this.getBarChartData();
      this.getColumnChartData();
      // this triggers chart drawing only after charts are ready
    });
    this.getDashboardData();
    this.loadGoogleCharts();
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.getPaymentData();
  }
  onyColumnChartYeareChange(event) {
    this.columnChartselectedYear = event.value;
    this.getColumnChartData();
  }
  drawPieChart(dataFromApi: any): void {
    const values = [
      Number(dataFromApi.affilation),
      Number(dataFromApi.participation),
      Number(dataFromApi.kit),
      Number(dataFromApi.misc),
    ];

    const isAllZero = values.every((val) => val === 0);

    const data = google.visualization.arrayToDataTable([
      ["Task", "Amount"],
      ...(isAllZero
        ? [["No Data", 1]] // placeholder slice
        : [
            ["Affilation", values[0]],
            ["Participation", values[1]],
            ["Kit", values[2]],
            ["Miscellaneous", values[3]],
          ]),
    ]);

    const options = {
      title: "Fee Collection Breakdown",
      pieHole: 0.4,
      sliceVisibilityThreshold: 0,
      colors: isAllZero ? ["#e0e0e0"] : undefined,
    };

    const chart = new google.visualization.PieChart(
      document.getElementById("pieChart")
    );
    chart.draw(data, options);
  }
  getCurrentYEar() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (month >= 5) {
      this.yearvalue = year + "-" + (year + 1);
    } else {
      this.yearvalue = year - 1 + "-" + year;
    }
    this.selectedYear = this.yearvalue;
  }
  getPaymentData() {
    this.dashboardService.getPaymentData(this.yearvalue).subscribe(
      (response) => {
        if (response !== "") {
          this.drawPieChart(response);
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  getBarChartData() {
    this.dashboardService.getBarChartDataData().subscribe((response: any[]) => {
      if (Array.isArray(response)) {
        this.drawBarChart(response);
      }
    });
  }
  getColumnChartData() {
    this.dashboardService
      .getColumnChartDataData(this.columnChartselectedYear)
      .subscribe((response: any[]) => {
        if (Array.isArray(response)) {
          this.drawColumnChart(response);
        }
      });
  }
  drawBarChart(chartData: any[]): void {
    const dataArray: any[] = [["Academic Year", "Boys", "Girls"]];

    chartData.forEach((row) => {
      dataArray.push([
        String(row.year), // Must be a string
        Number(row.boys), // Ensure number
        Number(row.girls), // Ensure number
      ]);
    });

    const data = google.visualization.arrayToDataTable(dataArray);

    const options = {
      title: "Student Gender Count (Last 5 Academic Years)",
      hAxis: { title: "Academic Year" },
      vAxis: { title: "Number of Students" },
      bars: "vertical",
      legend: { position: "top" },
      colors: ["#1f77b4", "#ff69b4"],
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById("barChart")
    );

    chart.draw(data, options);
  }
  loadGoogleCharts() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => {
      this.drawLineChart();
    });
  }

  drawColumnChart(chartData: any[]): void {
    // chart.draw(data, options);
    const dataArray: any[] = [["School", "Participation Fee"]];

    if (Array.isArray(chartData) && chartData.length > 0) {
      chartData.forEach((item) => {
        dataArray.push([String(item.schoolName), Number(item.payAmount)]);
      });
    } else {
      // Push dummy row to avoid empty data error
      dataArray.push(["No Data", 0.0001]);
    }

    const data = google.visualization.arrayToDataTable(dataArray);

    const options = {
      title: "Top 5 Schools by Participation Fee (Current Academic Year)",
      hAxis: {
        title: "School Name",
        slantedText: false,
        slantedTextAngle: 30,
      },
      vAxis: {
        title: "Participation Fee (INR)",
        viewWindow: {
          min: 0,
        },
      },
      legend: "none",
      colors: chartData.length === 0 ? ["#e0e0e0"] : ["#008000"],
      tooltip: chartData.length === 0 ? { trigger: "none" } : undefined,
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById("columnChart")
    );
    chart.draw(data, options);
  }
  drawLineChart() {
    const data = google.visualization.arrayToDataTable([
      ["Year", "Sales", "Expenses"],
      ["2019", 1000, 400],
      ["2020", 1170, 460],
      ["2021", 660, 1120],
      ["2022", 1030, 540],
    ]);

    const options = {
      title: "Company Performance (Line Chart)",
      curveType: "function",
      legend: { position: "bottom" },
    };

    const chart = new google.visualization.LineChart(
      document.getElementById("lineChart")
    );
    chart.draw(data, options);
  }
  navigate(dashboardType: any) {
    if (dashboardType == "student") {
      this.router.navigate(["/admin/student/"]);
    } else if (dashboardType == "event") {
      this.router.navigate(["/admin/event/"]);
    } else if (dashboardType == "school") {
      this.router.navigate(["/admin/admin-school/"]);
    } else {
      this.router.navigate(["/admin/game/"]);
    }
  }
  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe((response) => {
      if (response !== "") {
        this.studentCount = response["studentCount"];
        this.schoolCount = response["schoolCount"];
        this.eventCount = response["eventCount"];
        this.gameCount = response["gameCount"];
        // this.showspinner = false;
        // this.gameData =response;
        // this.schoolData = this.gameData;
        // console.log(this.schoolData.length)
      } else {
        alert("im blankl=");
      }
    });
  }
}
