import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LectureTablesComponent } from './lecture-tables/lecture-tables.component';


import { RouterModule } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './routerConfig';

import { FlexLayoutModule } from "@angular/flex-layout";

import { MatSortModule, MatPaginatorModule, MatSelectModule, MatCheckboxModule, MatExpansionModule } from '@angular/material';
import { MatTableModule ,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatTabsModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResourceTableComponent } from './resource-table/resource-table.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './login/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LectureTablesComponent,
    ResourceTableComponent,
    OverviewPageComponent,
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
