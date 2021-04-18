import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as moment from "moment";
import {IValues} from "../main/main.component";
import { MatPaginator } from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';

interface IDataSource {
  id: number;
  date: Date | string;
  gas: number;
  gasDiff?: number | string;
  electricity: number;
  elDiff?: number | string;
  hotWater: number;
  hotDiff?: number | string;
  coldWater: number;
  coldDiff?: number | string;
  totalCost?: number | string;
}

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  @Input() valuesForOne: IValues;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private initialData = [
    {id: 1, date: '10.01.2020', gas: 18.86, gasDiff: 0, electricity: 70.63, elDiff: 0, hotWater: 43.70, hotDiff: 0, coldWater: 66.70, coldDiff: 0, totalCost: 0},
    {id: 2, date: '11.01.2020', gas: 19.34, electricity: 71.71, hotWater: 45.67, coldWater: 69.88},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
    {id: 3, date: '12.01.2020', gas: 19.87, electricity: 73.35, hotWater: 47.23, coldWater: 72.74},
    {id: 4, date: '01.01.2021', gas: 20.70, electricity: 74.93, hotWater: 51.90, coldWater: 79.07},
    {id: 5, date: '02.01.2021', gas: 21.23, electricity: 76.60, hotWater: 57.40, coldWater: 85.85},
    {id: 6, date: '03.01.2021', gas: 21.64, electricity: 78.06, hotWater: 62.60, coldWater: 91.08},
  ];

  public displayedColumns: string[] = ['date', 'gas', 'gasDiff', 'electricity', 'elDiff', 'hot water', 'hotDiff', 'cold water', 'coldDiff', 'totalCost'];
  public testArray = new MatTableDataSource<IDataSource>(this.initialData);
  public roundValues = false;

  private defaultTestArray;

  constructor() {

  }

  ngAfterViewInit() {
    this.testArray.paginator = this.paginator;
  }


  ngOnInit() {
    this.testArray.filteredData = this.testArray.filteredData.map(item => ({
      ...item,
      date: this.getMonth(item.date),
    }));

    this.getDiffData(this.initialData);

    console.log(this.testArray)

    this.defaultTestArray = this.initialData;
  }

  public changeValues() {
    this.roundValues = !this.roundValues;
    if (this.roundValues) {
      this.initialData = this.initialData.map(item => ({
        ...item,
        gas: Math.round(item.gas as number),
        electricity: Math.round(item.electricity as number),
        hotWater: Math.round(item.hotWater as number),
        coldWater: Math.round(item.coldWater as number),
      }));

      this.getDiffData(this.initialData);
    //
    //   for (let i = 1; i < this.testArray.length; i++) {
    //     this.testArray[i].gasDiff = +(this.testArray[i].gas - this.testArray[i - 1].gas);
    //     this.testArray[i].elDiff = +(this.testArray[i].electricity - this.testArray[i - 1].electricity);
    //     this.testArray[i].hotDiff = +(this.testArray[i].hotWater - this.testArray[i - 1].hotWater);
    //     this.testArray[i].coldDiff = +(this.testArray[i].coldWater - this.testArray[i - 1].coldWater);
    //   }
    //
    //   for (let i = 1; i < this.testArray.length; i++) {
    //     this.testArray[i].totalCost = (this.testArray[i].gasDiff as number * 115.08 + +this.testArray[i].elDiff * 100 * 5.10 + +this.testArray[i].hotDiff * 182.20 + +this.testArray[i].coldDiff * 74).toFixed(2);
    //   }
    //
    //   console.log()
    //
    //   for (const item of this.testArray) {
    //     this.getAverage(item);
    //   }
    } else {
      this.initialData = this.defaultTestArray;
    }

  }

  public getAverage(field) {
    const values = this.initialData.map(item => item[field]);
    const total = values.reduce((acc, value) => acc + value, 0);

    const result = (total / values.length);

    return this.roundValues ? Math.round(result) : result.toFixed(2);
  }

  private getDiffData(data) {
    for (let i = 1; i < data.length; i++) {
      data[i].gasDiff = +(data[i].gas - data[i - 1].gas).toFixed(2);
      data[i].elDiff = +(data[i].electricity - data[i - 1].electricity).toFixed(2);
      data[i].hotDiff = +(data[i].hotWater - data[i - 1].hotWater).toFixed(2);
      data[i].coldDiff = +(data[i].coldWater - data[i - 1].coldWater).toFixed(2);
    }

    for (let i = 1; i < data.length; i++) {
      data[i].totalCost = parseFloat((+data[i].gasDiff * 115.08 + +data[i].elDiff * 100 * 5.10 + +data[i].hotDiff * 182.20 + +data[i].coldDiff * 74).toFixed(2));
    }
  }

  private getMonth(date: Date | string): string {
    const currentMonth = moment(date).month() + 1;
    let result = '';
    switch (currentMonth) {
      case 1: result = 'Январь'; break;
      case 2: result = 'Февраль'; break;
      case 3: result = 'Март'; break;
      case 4: result = 'Апрель'; break;
      case 5: result = 'Май'; break;
      case 6: result = 'Июнь'; break;
      case 7: result = 'Июль'; break;
      case 8: result = 'Август'; break;
      case 9: result = 'Сентябрь'; break;
      case 10: result = 'Октябрь'; break;
      case 11: result = 'Ноябрь'; break;
      case 12: result = 'Декабрь'; break;
      default: break;
    }
    return `${result} ${moment(date).year()}`;
  }

}
