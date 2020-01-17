import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {StudyDocEntry} from '../models/models';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss'],
/*  animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ] */
})
export class ResourceTableComponent implements OnInit {


    LIMIT = 30;

      getLinkName(fileName){
        if(fileName.length > this.LIMIT) {
            return fileName.substring(0, this.LIMIT - 7,) + "..." + fileName.substring(fileName.indexOf("."), fileName.length)
        }
        return fileName;
      }

  getContent(element, column){
    if(column == "files") {
      let files = element[column];

    }
    return element[column];
  }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    expandedElement: StudyDocEntry | null;

    @Input()
    idTag: String;

    @Input()
    public studyDocEntries :Array<StudyDocEntry>;
    public dataSource: MatTableDataSource<StudyDocEntry>;

    displayedColumns = [  "title", "professor", "author", "course_year", "files", 'lecture']
  @ViewChild(MatSort, {static: true}) sort: MatSort;

    columnsToDisplay = [
    "title", "professor", "author", "course_year", "files", 'lecture'
    ];

  constructor() {
    console.log(this.studyDocEntries)
  }
  openRes(file, el) {
     window.open(this.getPath(file, el), "_blank");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.studyDocEntries);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


    getLabel(key: string) {
      if(key == "title")
        return "Titel";
        if(key == "professor")
        return "Professor  "
        if(key == "author")
        return "Autor";
        if(key == "course_year")
        return "Jahr"
        if(key == "files")
        return "Dateien"

      return key;
    }

  getPath(item, el) {
    if(el.isLegacy)
      return item.file

    return 'https://api.amiv.ethz.ch/' + item.file;
  }

  debug(element: any) {
    console.log(element)
    return true
  }
}
