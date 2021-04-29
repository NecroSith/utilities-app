import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MainTableComponent } from './main-table/main-table.component';
import {FormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatMenuModule } from '@angular/material/menu'
import { FontAwesomeModule, FaIconLibrary } from "@fortawesome/angular-fontawesome";

import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { AddParamModalComponent } from './add-param-modal/add-param-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainTableComponent,
    MainSidebarComponent,
    AddParamModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    FormsModule,
    FontAwesomeModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  entryComponents: [
    AddParamModalComponent
  ],
  providers: [FaIconLibrary],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare);
  }
}
