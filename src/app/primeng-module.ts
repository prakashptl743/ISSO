import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { TabViewModule } from "primeng/tabview";
import { DialogModule } from "primeng/dialog";
import { PanelMenuModule } from "primeng/panelmenu";
import { ToastModule } from "primeng/toast";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import { DataViewModule } from "primeng/dataview";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PanelModule } from "primeng/panel";
import { TabMenuModule } from "primeng/tabmenu";
import { AccordionModule } from "primeng/accordion";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { MessagesModule } from "primeng/messages";
import { MenubarModule } from "primeng/menubar";
import { FileUploadModule } from "primeng/fileupload";
import { AutoCompleteModule } from "primeng/autocomplete";

@NgModule({
  exports: [
    TabMenuModule,
    CheckboxModule,
    DialogModule,
    DataViewModule,
    ConfirmDialogModule,
    ButtonModule,
    CalendarModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    TabViewModule,
    PanelMenuModule,
    ToastModule,
    InputTextareaModule,
    PanelModule,
    AccordionModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    MessagesModule,
    MenubarModule,
    FileUploadModule,
    AutoCompleteModule,
  ],
})
export class PrimengModule {}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
