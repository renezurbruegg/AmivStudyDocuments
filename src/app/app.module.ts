import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LectureTablesComponent } from './lecture-tables/lecture-tables.component';


import { RouterModule } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './routerConfig';

import { FlexLayoutModule } from "@angular/flex-layout";

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResourceTableComponent } from './resource-table/resource-table.component';
//import { OverviewPageComponent } from './overview-page/overview-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './login/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LectureTablesComponent,
    ResourceTableComponent,
  //  OverviewPageComponent,
    LoginComponent
  ],
  imports: [HttpClientModule,
    MatCardModule,AppRoutingModule,
    BrowserAnimationsModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatTabsModule, MatFormFieldModule, MatInputModule,
    BrowserModule,MatTableModule, MatSortModule, MatPaginatorModule,MatSelectModule,FlexLayoutModule,MatCardModule,MatProgressSpinnerModule, MatCheckboxModule,
FormsModule,  MatListModule, MatExpansionModule
  ],
  providers: [
       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
