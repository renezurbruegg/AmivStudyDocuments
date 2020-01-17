import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {StudyDocEntry, StudyDocRecord} from '../models/models';

@Component({
  selector: 'app-lecture-tables',
  templateUrl: './lecture-tables.component.html',
  styleUrls: ['./lecture-tables.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LectureTablesComponent implements OnInit {
  title:string = "";
  token: string;

  searchInput: string = "";


  departement: Array<string> = [];
  semesters: Array<string> = [];
  depValue;
  selectedDep;
  semValue;
  lectureValue;
  lectures : Array<string> = [];
  showSpinner1: boolean = false;
  showSpinner2: boolean = false;
  showSpinner3: boolean = false;
  allSemester = "all";
  allDep = "all";
  private selectedSemValue: string;

  onDepChanged() {
    console.log("dep cahnged " )
    console.log(this.depValue);
    this.selectedDep = this.depValue;
 //selectedSemValue
    if(this.depValue == this.allDep) {
      console.log("got all deps. Replacing with corresponding value");
      for(let dep of this.departement){
          if(dep != this.allDep) {
            this.selectedDep = this.selectedDep + "\",\"" + dep;
          }
      }
    }
    this.loadForDepartement();
  }
  async delay(ms: number) {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  onLectureChanged() {

      let path = "https://api.amiv.ethz.ch/studydocuments?where={\"lecture\":\"" + this.lectureValue + "\"}&sort=type%2C-course_year&max_result=500";
      console.log(path);
      this.title = this.lectureValue

      this.rootRecord = { _items: [] };
      this.typeToEntryMap = {};
      this.lastTypeAdded = undefined;
      this.typeLabels = [];
      this._typeLabels = [];
      this.ref.markForCheck();

      this.showSpinner3 = true;

      this.rootRecord= { _items: [] };

      this.router.navigate(['/lecture/'+this.lectureValue]);
        this.loadDataForUrl(path, 1, () => {this.loadDataForLegacy(this.lectureValue )});
      }
  onSemChanged() {
 //selectedSemValue
            this.selectedSemValue = this.semValue;
    if(this.semValue == this.allSemester) {
      console.log("got all sems. Replacing with corresponding value");
      for(let sem of this.semesters){
          if(sem != this.allDep) {
            this.selectedSemValue = this.selectedSemValue + "\",\"" + sem;
          }
      }
    }
      this.loadForSemester();
  }


  getPathForLec(lec){
    return "/lecture/" + lec.replace("/","*");
  }
  loadForSemester(){
  //  let path = "https://api.amiv.ethz.ch/studydocuments?where={\"department\":\""+ this.depValue + "\",\"semester\":\""+ this.semValue + "\" }";



    let path = "https://api.amiv.ethz.ch/studydocuments";
    // ?where=%7B%22semester%22%3A%7B%22%24in%22%3A%5B%22"+/*"5%2B"*/ this.semValue+"%22%5D%7D%2C%22department%22%3A%7B%22%24in%22%3A%5B%22"+ this.depValue +"%22%5D%7D%7D&sort=lecture%2C-course_year%2Ctype%2Ctitle%2Cauthor&max_results=10&page=1"


    let res = "?where={\"semester\":{\"$in\":[\""+this.selectedSemValue+"\"]},\"department\":{\"$in\":[\""+this.selectedDep+"\"]}}";

    path = path + encodeURI(res);
      path = path.replace("+","%2B");
    console.log(path);


    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  this.token)
    };

    this.showSpinner2 = true;
    this.http.get(path, header).subscribe( (data ) => {
      let summary = data["_summary"];

      let lectures_load = summary["lecture"];
        this.lectures = [];
    //  this.lectures =  [];

        for(let lec in lectures_load){
          console.log(lec)
          this.lectures.push(lec);
        }
            this.showSpinner2 = false;

        console.log("---")
        console.log(this.lectures.sort())
        console.log("---")
      console.log(data["_summary"]);
    });
  }
  loadForDepartement() {

        this.showSpinner1 = true;
    let path = "https://api.amiv.ethz.ch/studydocuments";
    let res = "?where={\"department\":{\"$in\":[\""+this.selectedDep+"\"]}}";
    path = path + encodeURI(res); ;
    console.log(path);
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  this.token)
    };

    this.http.get(path, header).subscribe( (data ) => {
      let summary = data["_summary"];
      let semester = summary["semester"];
      this.semesters = [];
      for(let sem in semester){
        console.log(sem)
        this.semesters.push(sem);
      }

      this.semesters =   this.semesters.sort((n1,n2) => {
        if (n1 > n2) {
            return 1;
        }

        if (n1 < n2) {
            return -1;
        }

        return 0;
    });

      this.semesters = [this.allSemester].concat(this.semesters);

        this.showSpinner1 = false;
      console.log(data["_summary"]);
    });
  }

  loadMetaInformation() {

        this.showSpinner1 = true;
    let path = "https://api.amiv.ethz.ch/studydocuments";
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  this.token)
    };

    this.http.get(path, header).subscribe( (data ) => {
      let summary = data["_summary"];
      let departements = summary["department"];
      this.departement = [];
      this.departement.push(this.allDep);
      for(let dep in departements){
        console.log(dep)
        this.departement.push(dep);
      }
      this.departement.sort();
      console.log(data["_summary"]);

          this.showSpinner1 = false;
    });

  }

  columnsToDisplay = [
  "title", "professor", "author", "course_year"
  ];


getPath(item) {
  return 'https://api.amiv.ethz.ch/' + item.file;
}

  rootRecord: StudyDocRecord = { _items: [] };
  lastTypeAdded: string;
  typeToEntryMap: Record<string, Array<StudyDocEntry>> = {};
  typeLabels = [];
  _typeLabels = [];

    private fragment: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient, private route : ActivatedRoute, private router: Router, private ref: ChangeDetectorRef) {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  getLabelForKey(key: string) {
    if(key == "type")
      return "Type";

    return key;
  }

  getRecordList() {
    let recordList:  Array<Array<StudyDocEntry>> = [];
    for(let entry in this.typeToEntryMap) {
      recordList.push(this.typeToEntryMap[entry]);
    }
    return recordList;
  }

getIdTag(item) {
  console.log("get id tag" + item);
  return "#"+item;
}


getEntry(type){
  return this.typeToEntryMap[type];
}

addEntryToMap(e){

  if(e.type in this.typeToEntryMap) {
      console.log( this.typeToEntryMap[e.type])
      for (let entry of  this.typeToEntryMap[e.type]) {
        if (entry.title == e.title)
          return
      }
      this.typeToEntryMap[e.type].push(e);

        console.log("---- e ----")
        console.log(e)

  } else {
    this.typeToEntryMap[e.type] = [e]
    this._typeLabels.push(e.type);


        console.log("---- e ----")
        console.log(e.type)
    if(this.lastTypeAdded) {
      // Added new type. store old ones
      this.typeLabels.push(this.lastTypeAdded);
    }
  }
  this.lastTypeAdded = e.type
}

// `Zca1pl7pxodMTQL88T8ziUQjoqwa60bZVe6xf9TC5fU`
  loadDataForUrl(path: string, page:number, cb: any){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', this.token)
    };

    this.http.get(path + "&page="+page, header).subscribe( (data : StudyDocRecord) => {
      console.log("got data");
      console.log(data._items);
      this.rootRecord = data._items;

      data._items.forEach(e => {
        this.addEntryToMap(e)
      });

      let links = data["_links"];

      if(links && links["next"]) {
        this.loadDataForUrl(path, ++page, cb);
      } else {
        cb()
        this.showSpinner3 = false;
        // Date loaded, push last type.

      }
      console.log(this.typeToEntryMap)


    })
  }

  private loadDataForLegacy(name) {
    let url = "https://matapi.mensazurich.ch"
    this.http.get(url + "/mat/forName/"+name).subscribe( (data : any) => {
      console.log("got data logacy");
      console.log(data);
      data.forEach(e => {
      e.isLegacy = true
        e.professor = "(legacy page)"
        this.addEntryToMap(e)
      });


      if(this.lastTypeAdded) {
        // Added new type. store old ones
        this.typeLabels.push(this.lastTypeAdded);
      }
    })
  }


  ngOnInit() {
    console.log("on init");
    this.token = localStorage.getItem("token");

    if(!this.token) {
      this.router.navigate(['/login']);
      //location.reload(true);
    }
    this.loadMetaInformation();
    try {
     document.querySelector('#' + this.fragment).scrollIntoView();
   } catch (e) { }

    let id = this.route.snapshot.params['id'];
    if(id.endsWith("$")) {
      id = id.substring(0,id.length - 1);
      this.searchInput = id;
    }
    if(!id) {
      return;
    }

    id = id.replace("*", "/")
    this.title = id;
    console.log(id);
    let path = "https://api.amiv.ethz.ch/studydocuments?where={\"lecture\":\"" + id + "\"}&sort=type%2C-course_year&max_result=500";
    this.loadDataForUrl(path, 1 , () => this.loadDataForLegacy(id) );
  }

  change() {

      this.rootRecord = { _items: [] };
      this.typeToEntryMap = {};
      this.lastTypeAdded = undefined;
      this.typeLabels = [];
      this._typeLabels = [];
      this.ref.markForCheck();


      this.rootRecord= { _items: [] };


    this.router.navigate(['/lecture/'+this.searchInput+"$"]);
    let id = this.searchInput

    if(id.endsWith("$")) {
      id = id.substring(0,id.length - 1);
      this.searchInput = id;
    }
    let path = "https://api.amiv.ethz.ch/studydocuments?where={\"lecture\":\"" + id + "\"}&sort=type%2C-course_year&max_result=500";
    this.loadDataForUrl(path, 1 , () => this.loadDataForLegacy(id) );
  }
}
