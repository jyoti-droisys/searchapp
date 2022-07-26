import { Component, OnInit } from '@angular/core';
import { data } from '../../assets/data/data'
@Component({
  selector: 'app-search-app',
  templateUrl: './search-app.component.html',
  styleUrls: ['./search-app.component.css']
})
export class SearchAppComponent implements OnInit {

  constructor() { }

  users: any = [];

  first = 0;

  rows = 10;


  ngOnInit() {
    this.users = data

  }
  onChangeSearch(e: any) {
    const searchKeyWord = e.target.value;
    this.users = data.filter(x => (x.name.first + ' ' + x.name.last).toLowerCase().includes(searchKeyWord.toLowerCase()))
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }
  customSort(event: any) {
    debugger;
    event.data.sort((data1: any, data2: any) => {
      let value1, value2;
      if (event.field.includes('.')) {
        const prop = event.field.split('.')
        value1 = data1[prop[0]][prop[1]]
        value2 = data2[prop[0]][prop[1]];
      }
      else {
        value1 = data1[event.field];
        value2 = data2[event.field];;
      }



      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
}
