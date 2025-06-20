import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { formatDate } from "@angular/common";
import { ConfirmationService, MessageService } from "primeng/api";
import { UserService } from "../service/uesr.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class AdminComponent implements OnInit {
  currentTime: Date = new Date();
  today = new Date();
  todaysDataTime = "";
  CurrentTime: any;
  adminMenuData: Object;
  faMenu: string;
  public todayDate: any;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private userSerview: UserService
  ) {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    this.todaysDataTime = formatDate(new Date(), "dd-MMM-yyyy", "en");
    // this.todaysDataTime = formatDate(this.today, 'dd-MMM-yyyy hh:mm:ss a', 'en-US', '+0530');
    setInterval(() => {
      this.CurrentTime =
        new Date().getHours() +
        "    :    " +
        new Date().getMinutes() +
        "   :    " +
        new Date().getSeconds();
    }, 1);
  }
  items: MenuItem[];
  ngOnInit() {
    this.todayDate = new Date();
    this.faMenu = "fas fa-sign-out-alt";
    this.adminMenuData = "";
    //  console.log('Im role-->'+localStorage.getItem('roleId'));
    const roleId = localStorage.getItem("roleId");
    const userId = localStorage.getItem("userId");
    if (roleId == "3") {
      this.newUserMenu(userId);
    } else {
      this.adminMenu();
    }
  }
  newUserMenu(userId) {
    console.log("USER ID==>" + userId);
    this.userSerview.getUserData(userId).subscribe((response) => {
      if (response !== "") {
        this.adminMenuData = response;
        const routeVal = this.adminMenuData[0]["routing"].slice(1);
        let newMenu = "admin" + routeVal;
        console.log(newMenu);
        this.router.navigate([newMenu]);
        console.log(response);
      } else {
        alert("im blankl=");
      }
    });
  }
  adminMenu() {
    this.userSerview.getMenuData("issoadmin").subscribe((response) => {
      if (response !== "") {
        this.adminMenuData = response;
        console.log(response);
      } else {
        alert("im blankl=");
      }
    });
  }
  logOff() {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-school",
      icon: "pi pi-info-circle",
      message: "Are you sure to want logoff?",
      accept: () => {
        this.logoffUser();
      },
    });
  }
  logoffUser() {}
}
