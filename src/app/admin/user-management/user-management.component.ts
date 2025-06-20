import { Component, OnInit } from "@angular/core";
import { SchoolService } from "../service/school.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { SelectItem } from "primeng/api";
import { FormControl } from "@angular/forms";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { ChangeDetectionStrategy, HostListener } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { School, WebCalender } from "../admin-interfaces";
import { Table } from "primeng/components/table/table";
import { WebcalenderService } from "../service/webcalender.service";
import { UserService } from "../service/uesr.service";

@Component({
  selector: "app-user-mgt",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class UserManagementComponent implements OnInit {
  adminMenuData: Object;
  isMenu: boolean;
  isUser: boolean;
  public userForm: FormGroup;
  error: any;
  issoAdminMenu: any;
  menuOptions: SelectItem[];
  menuVal: any;
  isDuplicate: boolean;
  mapMenuArray = [];
  menuIdArray = [];
  menuNameArray = [];
  menuArray = [];
  showMapData: boolean;
  menuName: any;
  usereData: Object;
  setUserData: any;
  issoUserrData: any;
  showChangePassword: boolean = false;
  constructor(
    private userService: UserService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isMenu = true;
    this.getMenuData("admin");
    this.initialiseForm();
    this.getMenuData("issoadmin");
    this.getUsers();
  }
  addMenu() {
    this.isDuplicate = false;

    if (this.mapMenuArray.length > 0) {
      for (let i = 0; i < this.mapMenuArray.length; i++) {
        if (this.menuVal === this.mapMenuArray[i].menu_id) {
          console.log("Im if");
          this.isDuplicate = true;
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: "This menu already exists!",
          });
        } else {
          console.log("im else");
        }
      }
    }
    if (!this.isDuplicate && this.mapMenuArray.length < 5) {
      this.mapMenuArray.push({
        menu_id: this.menuVal,
        menu_name: this.menuName,
      });
      this.menuIdArray.push(this.menuVal);
      this.menuNameArray.push(this.menuName);
    }

    if (this.mapMenuArray.length > 0) {
      this.showMapData = true;
    } else {
      this.showMapData = false;
    }
  }
  deleteUserData(userId) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-school",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete user data?",
      accept: () => {
        this.deleteUser(userId);
      },
    });
  }
  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(
      (res) => {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "User Data Deleted Successfully",
        });
        this.getUsers();
      },
      (error) => (this.error = error)
    );
  }
  addNewUser(event: Event, setUserData, type: any) {
    this.isUser = true;
    this.menuIdArray = [];
    this.menuNameArray = [];
    this.mapMenuArray = [];
    if (type == "edit") {
      this.userForm.setValue({
        userId: setUserData.userId,
        userName: setUserData.name,
        userEmail: setUserData.email,
        userMobile: setUserData.mobile,
        userPassword: setUserData.originalPassword,
      });
      //   console.log(setUserData.menuId);
      //   console.log(setUserData.menuName);
      // this.mapMenuArray.push({
      //   'menu_id':setUserData.menuId,
      //   'menu_name':setUserData.menuName,

      //   });
      const mmenuIdAArray = setUserData.menuId.split(",");
      const menuNameArray = setUserData.menuName.split(",");
      this.menuIdArray = mmenuIdAArray;
      this.menuNameArray = menuNameArray;

      var userMenuId = setUserData.menuId;
      var userMenuName = setUserData.menuName;

      var userMenuArray = userMenuId.split(",");
      var userMenuNameArray = userMenuName.split(",");

      for (var i = 0; i < userMenuArray.length; i++) {
        // console.log(userMenuArray[i]);
        this.mapMenuArray.push({
          menu_id: userMenuArray[i],
          menu_name: userMenuNameArray[i],
        });
      }
      // for(var j = 0; j < userMenuNameArray.length; j++)
      // {
      //   this.mapMenuArray.push({
      //     'menu_id':userMenuArray[j],
      //   });
      // }
      console.log("HELLO--->" + JSON.stringify(this.mapMenuArray));
      if (this.mapMenuArray.length > 0) {
        this.showMapData = true;
      } else {
        this.showMapData = false;
      }
    } else {
      this.menuIdArray = [];
      this.menuNameArray = [];
      this.mapMenuArray = [];
      this.showMapData = false;
      this.userForm = this.fb.group({
        userId: "",
        userName: "",
        userEmail: "",
        userMobile: "",
        userPassword: "",
      });
    }
  }
  resetForm() {
    this.userForm.reset();
    this.isUser = false;
    this.menuIdArray = [];
    this.menuNameArray = [];
  }
  getMenuData(userType) {
    this.userService.getMenuData(userType).subscribe((response) => {
      if (response !== "") {
        if (userType == "admin") {
          this.adminMenuData = response;
        } else {
          this.issoAdminMenu = response;
          this.menuOptions = [];
          this.issoAdminMenu.forEach((element) => {
            const menuIdAndName = element.menu_id + "," + element.menu_name;
            this.menuOptions.push({
              label: element.menu_name,
              value: menuIdAndName,
            });
          });
        }

        console.log(response);
      } else {
        alert("im blankl=");
      }
    });
  }
  onMenuChange(event) {
    const menuData = event.value;
    this.menuArray = menuData.split(",");
    this.menuVal = this.menuArray[0];
    this.menuName = this.menuArray[1];
  }
  initialiseForm() {
    this.userForm = this.fb.group({
      userId: [""],
      userName: ["", Validators.required],
      userEmail: ["", Validators.required],
      userMobile: ["", Validators.required],
      userPassword: ["", Validators.required],
    });
  }
  changeMenuStatus(menuId, val) {
    const formData = new FormData();
    formData.append("isActive", val);

    this.userService.changeMenuStatus(menuId, formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Menu Data Updated Successfully",
          });
        } else {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Menu Data Updated Successfully",
          });
        }

        this.getMenuData("admin");
      },
      (error) => (this.error = error)
    );
  }
  changeUserStatus(menuId, val) {
    const formData = new FormData();
    formData.append("isActive", val);

    this.userService.changeUserStatus(menuId, formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "User Data Updated Successfully",
          });
        } else {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "User Data Updated Successfully",
          });
        }

        this.getUsers();
      },
      (error) => (this.error = error)
    );
  }
  onSubmit() {
    const formData = new FormData();
    let menuId;
    let menuName;
    if (this.menuIdArray.length > 0) {
      menuId = this.menuIdArray.toString();
      menuName = this.menuNameArray.toString();
    }

    let userId = this.userForm.get("userId").value;
    formData.append("userName", this.userForm.get("userName").value);
    formData.append("userEmail", this.userForm.get("userEmail").value);
    formData.append("userMobile", this.userForm.get("userMobile").value);
    formData.append("userPassword", this.userForm.get("userPassword").value);
    formData.append("menuId", menuId);
    formData.append("menuName", menuName);

    if (userId == "") {
      this.userService.saveUserData(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.messageService.add({
              severity: "error",
              summary: "Error Message",
              detail: "Validation failed",
            });
          } else {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "User Data Added Successfully",
            });
            this.userForm.reset();
            this.menuIdArray = [];
            this.menuNameArray = [];
            this.isUser = false;
            this.getUsers();
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.userService.editUserData(userId, formData).subscribe(
        (res) => {
          if (res.status === "success") {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "User Data Updated Successfully",
            });
            //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "User Data Updated Successfully",
            });
          }
          this.userForm.reset();
          this.menuIdArray = [];
          this.menuNameArray = [];
          this.isUser = false;
          this.getUsers();
        },
        (error) => (this.error = error)
      );
    }
  }

  removeMappedData(i: number): void {
    this.mapMenuArray.splice(i, 1);
    this.menuIdArray.splice(i, 1);
    this.menuNameArray.splice(i, 1);
    if (this.mapMenuArray.length == 0) {
      this.showMapData = false;
    }
  }

  getUsers() {
    this.userService.getIssoUsers().subscribe((response) => {
      if (response !== "") {
        this.usereData = response;
        this.issoUserrData = this.usereData;
      } else {
        alert("im blankl=");
      }
    });
  }
}
